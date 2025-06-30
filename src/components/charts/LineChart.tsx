import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
  ScriptableContext,
} from "chart.js";
import { PeriodTitle } from "@/app/(dashboard)/_components/SalesReport";
import { useCurrencyStore } from "@/store/useCurrencyStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({
  graphData,
  period,
  loading,
}: {
  graphData: { labels: string[]; data: number[]; actualData: number[] };
  period: PeriodTitle;
  loading: boolean;
}) => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  const getXAxisTitle = (period: string) => {
    switch (period) {
      case "12 months":
        return "Months";
      case "3 months":
        return "Months";
      case "30 days":
        return "Days";
      case "7 days":
        return "Days";
      case "24 hours":
        return "Hours";
      default:
        return "Time Period";
    }
  };

  const data = {
    labels: graphData?.labels,
    datasets: [
      {
        label: "Value",
        data: graphData?.data,
        fill: true,
        backgroundColor: function (context: ScriptableContext<"line">) {
          const chart = context.chart;
          const chartArea = chart.chartArea;

          // Check if chartArea is defined
          if (!chartArea) {
            return "rgba(75, 0, 130, .1)"; // Fallback solid color
          }

          const { top, bottom } = chartArea;
          const ctx = chart.ctx;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, "rgba(225, 201, 242, .1)"); // Start color
          gradient.addColorStop(1, "rgba(255, 255, 255, 1)"); // Fade to white
          return gradient;
        },
        borderColor: "rgba(75, 0, 130, .7)",
        tension: 0.4,
      },
    ],
  };
  const { selectedCurrency } = useCurrencyStore();
  const maxValue = Math.max(...graphData.actualData) || 100;
  const yAxisMax = maxValue * 1.1;

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: getXAxisTitle(period),
        },
      },
      y: {
        display: true,
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: `Income (${selectedCurrency.name})`,
        },
        min: 0,
        max: Number(yAxisMax.toFixed(2)),
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const originalValue = graphData.actualData[context.dataIndex || 0];
            return ` ${selectedCurrency.sign}${originalValue.toLocaleString()}`;
          },
        },
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [graphData]);

  if (loading) {
    return (
      <div
        style={{ height: "200px" }}
        className="flex items-center justify-center w-full"
      >
        <div className="animate-pulse flex flex-col items-center gap-4 w-full">
          <div className="w-3/4 h-40 bg-gray-200 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "200px" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineChart;
