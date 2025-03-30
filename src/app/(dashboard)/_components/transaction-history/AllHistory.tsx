"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Avatar from "@/components/ui/Avatar";
import SearchBox from "@/components/ui/SearchBox";
import Spinner from "@/components/ui/Spinner";
import { ITransaction } from "@/types/transactions";
import {
  convertTime,
  getCurrencySymbol,
  groupByDate,
  truncateString,
} from "@/utils/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "@/styles/misc.css";

interface Props {
  close: () => void;
  data: ITransaction[];
  setSelectedTxn: Dispatch<SetStateAction<ITransaction | null>>;
  setScreen: Dispatch<SetStateAction<"all" | "filter" | "receipt" | "single">>;
  isLoading?: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
}

const AllHistory = ({
  close,
  data = [],
  setSelectedTxn,
  setScreen,
  isLoading,
  fetchNextPage,
  hasNextPage,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data.filter(
    (txn) =>
      txn?.third_party_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
  );

  const groupedTxns = groupByDate<ITransaction>(
    filteredData,
    "transaction_date_time"
  );

  const handleClickRequest = (txn: ITransaction) => {
    setScreen("single");
    setSelectedTxn(txn);
  };
  return (
    <div>
      <SideWrapperHeader
        title="Transaction History"
        close={close}
        titleColor="text-zinc-900"
      />
      <div className="flex justify-between gap-[15px] items-center mb-7">
        <SearchBox
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <Image
            src={"/icons/filter.svg"}
            alt="filter"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center ">
            <Spinner />
          </div>
        ) : (
          <InfiniteScroll
            className="flex flex-col !h-full pb-8"
            dataLength={data.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={
              <p className="text-center text-raiz-gray-950 text-[13px]">
                Loading more...
              </p>
            }
            endMessage={
              data.length > 0 && (
                <p className="text-center text-raiz-gray-950 text-[13px]">
                  You&#39;re caught up!
                </p>
              )
            }
          >
            <div className="flex flex-col gap-[29px] mt-3 h-full overflow-y-scroll no-scrollbar pb-[20px]">
              {Object.keys(groupedTxns).length > 0
                ? Object.keys(groupedTxns).map((dateLabel) => (
                    <div key={dateLabel}>
                      <h4 className="text-raiz-gray-950 text-base font-medium font-brSonoma leading-tight">
                        {dateLabel}
                      </h4>
                      <div className="flex flex-col gap-5 mt-2">
                        {groupedTxns[dateLabel].map((each, index) => {
                          const date = dayjs(
                            convertTime(each?.transaction_date_time)
                          );
                          const isToday = date.isSame(dayjs(), "day");
                          return (
                            <button
                              key={index}
                              onClick={() => handleClickRequest(each)}
                              className={`flex gap-3 w-full pb-4 border-b border-gray-100`}
                            >
                              <div className="w-12 h-12 relative">
                                <Avatar
                                  name={each?.third_party_name || ""}
                                  src={each?.third_party_profile_image_url}
                                />
                              </div>

                              <div className="flex justify-between w-full text-left items-center">
                                <div className="flex flex-col gap-1.5">
                                  <p className=" text-zinc-900 text-sm font-semibold leading-none">
                                    {truncateString(each?.third_party_name, 20)}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <span className="text-center justify-start text-zinc-400 text-xs font-medium font-brSonoma leading-tight">
                                      {isToday
                                        ? `Today, ${date.format("HH:mm")}`
                                        : date.format("DD MMM YYYY @ h:mm A")}
                                    </span>
                                  </div>
                                </div>
                                <span
                                  className={`${
                                    each?.transaction_type.transaction_type ===
                                    "debit"
                                      ? "text-red-600"
                                      : "text-raiz-gray-900"
                                  }  text-sm font-semibold leading-tight`}
                                >
                                  {getCurrencySymbol(each?.currency || "")}
                                  {each?.transaction_amount?.toLocaleString() ||
                                    "0"}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                : "No history"}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default AllHistory;
