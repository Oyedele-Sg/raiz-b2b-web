"use client";
import Tabs from "@/components/ui/Tabs";
import Image from "next/image";
import React, { useState } from "react";
import EmptyRequest from "./EmptyRequest";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IBillRequest } from "@/types/transactions";
import { getCurrencySymbol, groupByDate } from "@/utils/helpers";
import { RequestStepsProps } from "./RequestHome";
import { useQuery } from "@tanstack/react-query";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { IBillRequestParams } from "@/types/services";
import { FetchSentRequestApi } from "@/services/transactions";
import Avatar from "@/components/ui/Avatar";
dayjs.extend(relativeTime);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    <p className="mt-4 text-zinc-700 text-sm font-medium">
      Loading requests...
    </p>
  </div>
);

const AllRequests = ({ setStep }: RequestStepsProps) => {
  const [type, setType] = useState<undefined | 1 | 2>();
  const { selectedCurrency } = useCurrencyStore();
  const { data: response, isLoading } = useQuery({
    queryKey: [
      "sent-requests",
      { currency: selectedCurrency.name, status_id: type },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IBillRequestParams];
      return FetchSentRequestApi(params);
    },
  });

  const data = response?.data || [];

  const groupedRequests = groupByDate<IBillRequest>(data, "created_at");
  return (
    <div className="h-full p-[25px] xl:p-[30px] ">
      <div className="flex justify-between items-center mb-[36px]">
        <h1 className="text-zinc-900 text-base font-bold leading-tight">
          Request
        </h1>
        <div className="flex gap-4 items-center ">
          <button className="w-5 h-5">
            <Image
              src={"/icons/search-2.svg"}
              alt="serach"
              height={22}
              width={22}
              className="w-[22px] h-[22px]"
            />
          </button>
          <button onClick={() => setStep("request")} className="w-5 h-5">
            <Image
              src={"/icons/add.svg"}
              alt="add"
              height={22}
              width={22}
              className="w-[22px] h-[22px]"
            />
          </button>
        </div>
      </div>
      <div className="">
        <Tabs
          options={[
            { label: "All", value: undefined },
            { label: "Pending", value: 2 },
            { label: "Rejected", value: 1 },
          ]}
          selected={type}
          onChange={setType}
          className={`${data?.length > 0 ? "mb-[50px]" : "mb-[120px]"} `}
        />
        <div className="flex flex-col gap-5">
          {isLoading ? (
            <LoadingState />
          ) : Object.keys(groupedRequests).length > 0 ? (
            Object.keys(groupedRequests).map((dateLabel) => (
              <div key={dateLabel}>
                <h4 className="text-raiz-gray-950 text-base font-medium font-brSonoma leading-tight">
                  {dateLabel}
                </h4>
                <div className="flex flex-col gap-5 mt-2">
                  {groupedRequests[dateLabel].map((each, index) => {
                    const formatRelativeTime = (date: Date | string) => {
                      const time = dayjs(date).fromNow(true);
                      return time
                        .replace("minutes", "min")
                        .replace("hours", "hr")
                        .replace("seconds", "sec");
                    };
                    return (
                      <div
                        key={index}
                        className={`flex gap-3 w-full pb-4 border-b border-gray-100`}
                      >
                        <div className="w-12 h-12 relative">
                          <Avatar
                            name={each?.third_party_account?.account_name}
                            src={each?.third_party_account?.selfie_image}
                          />
                        </div>

                        <div className="flex justify-between w-full">
                          <div className="flex flex-col gap-1.5">
                            <p className=" text-zinc-900 text-sm font-semibold leading-none">
                              {each?.third_party_account?.account_name}
                            </p>
                            <div className="flex items-center gap-1">
                              <p className="text-center flex text-zinc-700 text-xs font-medium font-brSonoma leading-tight">
                                {getCurrencySymbol(each?.currency)}
                                {each?.transaction_amount.toLocaleString()}{" "}
                              </p>
                              <span className="w-1 h-1 bg-zinc-900 rounded-full" />{" "}
                              <span className="text-center justify-start text-zinc-400 text-xs font-medium font-brSonoma leading-tight">
                                {formatRelativeTime(each?.created_at)}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`h-[19px] w-[66px] px-2 py-0.5 bg-amber-300 bg-opacity-20 rounded-lg inline-flex justify-center items-center gap-2`}
                          >
                            <span
                              className={`text-center capitalize  justify-center text-yellow-600 text-[10px] font-bold leading-none"`}
                            >
                              {each?.status.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <EmptyRequest />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRequests;
