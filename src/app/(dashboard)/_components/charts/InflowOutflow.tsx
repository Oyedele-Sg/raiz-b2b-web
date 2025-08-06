"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Filler,
  Title,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import dayjs from "dayjs";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FetchTransactionReportChartApi } from "@/services/business";
import { useUser } from "@/lib/hooks/useUser";
import { ITxnReportPayload } from "@/types/services";
import { findWalletByCurrency } from "@/utils/helpers";

ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Filler,
  Title
);

const InflowOutflow = () => {
  const { user } = useUser();
  const NGNAcct = findWalletByCurrency(user, "NGN");
  const USDAcct = findWalletByCurrency(user, "USD");
  const { selectedCurrency } = useCurrencyStore();
  const getCurrentWallet = () => {
    if (selectedCurrency.name === "NGN") {
      return NGNAcct;
    } else if (selectedCurrency.name === "USD") {
      return USDAcct;
    }
  };

  const currentWallet = getCurrentWallet();

  // Default to 12 months (365 days)
  const numberOfDays = 365;

  const { data, isLoading } = useQuery({
    queryKey: [
      "income-expense-chart",
      {
        wallet_id: currentWallet?.wallet_id,
        number_of_days: numberOfDays,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, ITxnReportPayload];
      return FetchTransactionReportChartApi(params);
    },
    enabled: !!currentWallet?.wallet_id,
  });

  const labels =
    data?.analytics?.map((item) => dayjs(item.date).format("MMM")) ?? [];
  const inflow = data?.analytics?.map((item) => item.credit_amount) ?? [];
  const outflow = data?.analytics?.map((item) => item.debit_amount) ?? [];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Inflow",
        data: inflow,
        borderColor: "#7F56D9", // Line color
        backgroundColor: "rgba(127, 86, 217, 0.15)", // Area fill
        pointBackgroundColor: "#7F56D9", // Dot color (if used)
        pointBorderColor: "#fff",
        fill: "start",
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Outflow",
        data: outflow,
        borderColor: "#B692F6", // Line color
        backgroundColor: "rgba(182, 146, 246, 0.15)", // Area fill
        pointBackgroundColor: "#B692F6",
        pointBorderColor: "#fff",
        fill: "start",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#6B7280",
          font: {
            size: 14,
            weight: 400,
          },
          padding: 16,
          boxWidth: 8,
          boxHeight: 8,
          generateLabels: (chart) => {
            const { data } = chart;
            const customColors = ["#7F56D9", "#B692F6"]; // inflow, outflow

            return data.datasets.map((dataset, i) => ({
              text: dataset.label || "",
              fillStyle: customColors[i],
              strokeStyle: customColors[i],
              lineWidth: 0,
              pointStyle: "circle",
              hidden: !chart.isDatasetVisible(i),
              index: i,
            }));
          },
        },
      },

      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"line">) =>
            `${ctx.dataset.label}: ${selectedCurrency.sign}${Number(
              ctx.raw
            ).toLocaleString()}`,
        },
      },
      title: {
        display: true,
        text: "Analytics",
        align: "start",
        color: "#111827",
        font: {
          size: 18,
          weight: "bold",
          family: "Inter",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          color: "#6B7280",
          font: {
            weight: 500,
          },
        },
        ticks: {
          color: "#6B7280",
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "USD $",
          color: "#6B7280",
          font: {
            weight: 500,
          },
        },
        ticks: {
          callback: (value) => {
            return `${Number(value) / 1000}K`;
          },
          color: "#6B7280",
        },
        grid: {
          color: "#F3F4F6",
        },
      },
    },
  };

  return (
    <div
      className={`${"w-1/2 h-[300px]"}  p-4 bg-white rounded-2xl border border-[#F3F1F6]`}
    >
      {isLoading ? (
        <Skeleton height={250} />
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default InflowOutflow;
