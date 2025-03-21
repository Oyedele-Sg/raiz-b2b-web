"use client";
import Tabs from "@/components/ui/Tabs";
import Image from "next/image";
import React, { useState } from "react";
import EmptyRequest from "./EmptyRequest";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IBillRequest } from "@/types/transactions";
import { groupByDate } from "@/utils/helpers";
import { RequestStepsProps } from "./RequestHome";
dayjs.extend(relativeTime);

const transactions = [
  {
    requestee_entity_id: "entity_1",
    transaction_amount: 100,
    narration: "Payment for services",
    transaction_category_id: 1,
    requester_entity_id: "entity_2",
    currency: "USD",
    status_id: 1,
    request_transfer_id: "transfer_1",
    created_at: "2025-03-20T11:24:26.000Z",
    updated_at: "2025-03-20T11:24:26.000Z",
    status: {
      status: "Completed",
      description: "Transaction successful",
      status_code: 200,
      request_fund_status_id: 1,
      created_at: "2025-03-20T11:24:26.000Z",
      updated_at: "2025-03-20T11:24:26.000Z",
    },
    third_party_account: {
      entity_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      account_name: "John Doe",
      username: "johndoe",
      selfie_image: null,
    },
  },
  {
    requestee_entity_id: "entity_3",
    transaction_amount: 250,
    narration: "Refund for purchase",
    transaction_category_id: 2,
    requester_entity_id: "entity_4",
    currency: "EUR",
    status_id: 2,
    request_transfer_id: "transfer_2",
    created_at: "2025-03-20T12:30:00.000Z",
    updated_at: "2025-03-20T12:30:00.000Z",
    status: {
      status: "Pending",
      description: "Awaiting approval",
      status_code: 102,
      request_fund_status_id: 2,
      created_at: "2025-03-20T12:30:00.000Z",
      updated_at: "2025-03-20T12:30:00.000Z",
    },
    third_party_account: {
      entity_id: "4b7c85f4-1234-4567-89ab-2c963f66afa7",
      account_name: "Jane Smith",
      username: "janesmith",
      selfie_image: null,
    },
  },
];

const AllRequests = ({ setStep }: RequestStepsProps) => {
  const [type, setType] = useState<"all" | "pending" | "rejected">("all");
  const data = transactions || [];

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
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Rejected", value: "rejected" },
          ]}
          selected={type}
          onChange={setType}
          className={`${data?.length > 0 ? "mb-[50px]" : "mb-[120px]"} `}
        />
        <div className="flex flex-col gap-5">
          {Object.keys(groupedRequests).length > 0 ? (
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
                          <Image
                            src={
                              each?.third_party_account?.selfie_image ||
                              "/images/default-pfp.svg"
                            }
                            alt={each?.third_party_account?.account_name}
                            width={48}
                            height={48}
                            className="w-12 h-12"
                          />
                        </div>
                        <div className="flex justify-between w-full">
                          <div className="flex flex-col gap-0.5">
                            <p className=" text-zinc-900 text-sm font-semibold leading-none">
                              {each?.third_party_account?.account_name}
                            </p>
                            <div className="flex items-center gap-1">
                              <p className="text-center flex text-zinc-700 text-xs font-medium font-brSonoma leading-tight">
                                {each?.currency}
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
                              className={`text-center justify-center text-yellow-600 text-[10px] font-bold leading-none"`}
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
