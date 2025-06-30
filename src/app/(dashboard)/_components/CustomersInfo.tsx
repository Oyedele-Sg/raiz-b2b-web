import Image from "next/image";
import React from "react";

const customersData = [
  {
    title: "All customers",
    icon: "/icons/users.svg",
    value: 2420,
    change: 0,
  },
  {
    title: "New customers",
    icon: "/icons/newuser.svg",
    value: 1210,
    change: -10,
  },
  {
    title: "Returning customers",
    icon: "/icons/Reject.svg",
    value: 306,
    change: 20,
  },
];

const CustomersInfo = () => {
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
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 p-2.5 rounded-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] border border-raiz-gray-100 justify-center items-center flex">
                  <Image
                    src={each.icon}
                    alt={each.title}
                    width={28}
                    height={28}
                  />
                </div>
                <span className="text-gray-950  font-bold  leading-tight">
                  {each.title}
                </span>
              </div>
              <button>
                <Image
                  src={"/icons/Dropdown.svg"}
                  alt="options"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            <div className="flex w-full justify-between items-end gap-4">
              <div className="flex items-start gap-1.5">
                <span className="text-gray-950 text-[1.2rem] xl:text-[2rem] font-semibold  leading-[38.40px]">
                  {each.value.toLocaleString()}
                </span>
                {value !== "zero" && (
                  <div className="flex items-center gap-0.5">
                    <Image
                      src={
                        value === "positive"
                          ? "/icons/trend-up.svg"
                          : "/icons/trend-down.svg"
                      }
                      alt="change"
                      width={20}
                      height={20}
                    />

                    <span
                      className={`${
                        value === "positive"
                          ? "text-raiz-success-500"
                          : value === "negative"
                          ? "text-raiz-error"
                          : "text-raiz-gray-950"
                      }  text-center text-[11px]  xl:text-sm font-bold  leading-[16.80px]`}
                    >{`${each.change}%`}</span>
                  </div>
                )}
              </div>
              <Image
                className="w-[100px] xl:w-[128px]"
                src={
                  value === "positive"
                    ? "/icons/positiveChart.svg"
                    : value === "negative"
                    ? "/icons/NegativeChart.svg"
                    : "/icons/zeroChart.svg"
                }
                alt="chart"
                width={128}
                height={64}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomersInfo;
