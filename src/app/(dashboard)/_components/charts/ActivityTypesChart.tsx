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
// import Skeleton from "react-loading-skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActivityTypesChart = () => {
  const labels = [
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
        // data: [
        //   300000, 350000, 200000, 220000, 250000, 240000, 260000, 270000,
        //   280000, 290000, 310000, 260000,
        // ],
        data: [],
        backgroundColor: "#0D6494",
      },
      {
        label: "Send",
        // data: [
        //   200000, 250000, 200000, 180000, 230000, 210000, 240000, 230000,
        //   260000, 250000, 270000, 240000,
        // ],
        data: [],
        backgroundColor: "#4693BE",
      },
      {
        label: "Top Up",
        // data: [
        //   300000, 350000, 180000, 200000, 300000, 250000, 280000, 270000,
        //   250000, 240000, 260000, 220000,
        // ],
        data: [],
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
            `${ctx.dataset.label}: $${Number(ctx.raw).toLocaleString()}`,
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
