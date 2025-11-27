"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetActivityStats } from "@/services/transactions";
import { useUser } from "@/lib/hooks/useUser";
import Skeleton from "react-loading-skeleton";
import { findWalletByCurrency, getCurrencySymbol } from "@/utils/helpers";
import { useCurrencyStore } from "@/store/useCurrencyStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActivityTypesChart = () => {
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
  // const currentWallet = useCurrentWallet(user);
  const { data, isLoading } = useQuery({
    queryKey: ["activity-stats", currentWallet?.wallet_id],
    queryFn: () => GetActivityStats(currentWallet?.wallet_id || ""),
    enabled: !!currentWallet?.wallet_id,
  });

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="w-1/2 h-[300px] p-4 bg-white rounded-2xl border-[#F3F1F6] border">
        <Skeleton height={250} />
      </div>
    );
  }

  // Extract month labels from activity data
  const labels = data?.activity?.map((item) => {
    // Convert "Sep 2024" format to "Sep"
    const month = item.month.split(" ")[0];
    return month;
  }) || [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Swap",
        data: data?.activity?.map((item) => item.swap) || [],
        backgroundColor: "#0D6494",
      },
      {
        label: "Send",
        data: data?.activity?.map((item) => item.transfer) || [],
        backgroundColor: "#4693BE",
      },
      {
        label: "Top Up",
        data: data?.activity?.map((item) => item.top_up) || [],
        backgroundColor: "#E0EEF5",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#334155", // Tailwind slate-700
          font: {
            size: 14,
            weight: 500,
            family: "Inter",
          },
          padding: 16,
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      title: {
        display: true,
        text: "Activity Types",
        align: "start",
        color: "#111827",
        font: {
          size: 18,
          weight: "bold",
          family: "Inter",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"bar">) =>
            `${ctx.dataset.label}: ${getCurrencySymbol(
              currentWallet?.wallet_type?.currency || ""
            )}${Number(ctx.raw).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Month",
          color: "#6B7280", // gray-500
          font: {
            weight: 500,
          },
        },
        ticks: {
          color: "#6B7280",
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Volume $",
          color: "#6B7280",
          font: {
            weight: 500,
          },
        },
        ticks: {
          color: "#6B7280",
          callback: (value) => `${Number(value) / 1000}K`,
        },
        grid: {
          color: "#F3F4F6",
        },
      },
    },
  };

  return (
    <div className="w-1/2  h-[300px] p-4 bg-white rounded-2xl border-[#F3F1F6] border">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ActivityTypesChart;
