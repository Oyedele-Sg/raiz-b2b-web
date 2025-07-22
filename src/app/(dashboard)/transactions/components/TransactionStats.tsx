import Image from "next/image";
import React from "react";
import { GoArrowUp } from "react-icons/go";

const customersData = [
  {
    title: "Completed Transactions",
    value: 2420,
    change: 40,
  },
  {
    title: "Pending Transactions",
    value: 316,
    change: -10,
  },
  {
    title: "Failed Transactions",
    value: 1216,
    change: -20,
  },
];

const TransactionStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-[2rem] ">
      {customersData.map((each, index) => {
        const value =
          each.change > 0 ? "positive" : each.change < 0 ? "negative" : "zero";

        return (
          <div
            key={index}
            className="p-6 lg:p-3 xl:p-6 bg-raiz-gray-50 rounded-xl shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-raiz-gray-100 flex-col justify-start items-start gap-6 inline-flex w-full"
          >
            <div className="flex justify-between w-full">
              <span className="text-zinc-900  font-semibold">{each.title}</span>
              <button>
                <Image
                  src={"/icons/more.svg"}
                  alt="options"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <div className="flex flex-col w-full justify-between  ">
              <span className="text-gray-950 text-[1.2rem] xl:text-[2rem] font-semibold font-monzo  leading-[38.40px]">
                {each.value.toLocaleString()}
              </span>
              <div className="flex w-full justify-between items-end gap-2 xl:gap-4">
                {value !== "zero" && (
                  <div className="flex items-center gap-0.5 whitespace-nowrap">
                    <GoArrowUp
                      size={20}
                      className={
                        value === "positive"
                          ? "text-[#079455]"
                          : value === "negative"
                          ? "text-[#D92D20] rotate-180"
                          : ""
                      }
                    />
                    <span
                      className={`${
                        value === "positive"
                          ? "text-raiz-success-500"
                          : value === "negative"
                          ? "text-raiz-error"
                          : "text-raiz-gray-950"
                      }  text-center text-[11px]  xl:text-sm font-bold  leading-[16.80px]`}
                    >
                      {`${each.change}%`}{" "}
                      <span className="text-raiz-gray-700 font-normal">
                        vs last month
                      </span>
                    </span>
                  </div>
                )}
                <Image
                  className="w-[100px] xl:w-[128px]"
                  src={
                    value === "positive"
                      ? "/icons/positiveChart2.svg"
                      : value === "negative"
                      ? "/icons/NegativeChart2.svg"
                      : "/icons/zeroChart.svg"
                  }
                  alt="chart"
                  width={128}
                  height={64}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionStats;
