"use client";
import LineChart from "@/components/charts/LineChart";
import { months } from "@/constants/misc";
import { getLastThreeMonths } from "@/utils/helpers";
import React, { useState } from "react";

export type PeriodTitle =
  | "12 months"
  | "3 months"
  | "30 days"
  | "7 days"
  | "24 hours";

const mockData: Record<
  PeriodTitle,
  { labels: string[]; data: number[]; actualData: number[] }
> = {
  "12 months": {
    labels: months,
    data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 120)),
    actualData: Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 12000)
    ),
  },
  "3 months": {
    labels: getLastThreeMonths(),
    data: Array.from({ length: 3 }, () => Math.floor(Math.random() * 120)),
    actualData: Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 12000)
    ),
  },
  "30 days": {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 120)),
    actualData: Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 12000)
    ),
  },
  "7 days": {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 120)),
    actualData: Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 12000)
    ),
  },
  "24 hours": {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 120)),
    actualData: Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 12000)
    ),
  },
};

const SalesReport = () => {
  const periodTabs = [
    {
      title: "12 months",
      labels: months,
    },
    {
      title: "3 months",
      labels: getLastThreeMonths(),
    },
    {
      title: "30 days",
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    },
    {
      title: "7 days",
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    {
      title: "24 hours",
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    },
  ];
  const [activePeriod, setActivePeriod] = useState<PeriodTitle>(
    periodTabs[0].title as PeriodTitle
  );

  return (
    <div className=" h-[361px] w-full mt-6 bg-raiz-gray-50 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-raiz-gray-100 flex-col justify-start items-start inline-flex p-6">
      <div className="flex justify-between items-center w-full">
        <h6 className="text-raiz-gray-950 text-lg font-bold   leading-snug">
          Sales report
        </h6>
        <button className="h-[37px]  px-3.5 py-2.5 bg-raiz-gray-50 hover:border-raiz-gray-200 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-raiz-gray-100 justify-center items-center gap-1 inline-flex ">
          <span className="text-raiz-gray-700 text-sm font-bold  leading-[16.80px]">
            View report
          </span>
        </button>
      </div>

      {/* periods */}
      <div className="flex gap mt-5 gap-1 items-center">
        {periodTabs.map((tab, i) => (
          <button
            onClick={() => setActivePeriod(tab.title as PeriodTitle)}
            key={i}
            className="px-3 py-2 bg-[#fcfcfd] rounded-md justify-center items-center gap-2 inline-flex"
          >
            <span
              className={`${
                activePeriod === tab.title
                  ? "text-raiz-gray-700 font-bold"
                  : "text-raiz-gray-600 font-semibold"
              } text-sm   leading-[16.80px]`}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      {/* chart */}
      <div className="mt-6 w-full">
        <LineChart graphData={mockData[activePeriod]} period={activePeriod} />
      </div>
    </div>
  );
};

export default SalesReport;
