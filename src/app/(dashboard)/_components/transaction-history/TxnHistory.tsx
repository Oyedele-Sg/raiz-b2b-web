"use client";
import React, { useState } from "react";
import AllHistory from "./AllHistory";
import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";
import { useUser } from "@/lib/hooks/useUser";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ITransactionParams } from "@/types/services";
import { FetchTransactionReportApi } from "@/services/transactions";
import { ITransaction } from "@/types/transactions";
import TxnReceipt from "./TxnReceipt";
import FilterHistory from "./FilterHistory";
import { useQuery } from "@tanstack/react-query";
import { GetTransactionClasses } from "@/services/transactions";

export type customDateType = {
  day: string;
  month: string;
  year: string;
};

interface Props {
  close: () => void;
}

type ScreenType = "all" | "filter" | "receipt" | "single";
const TxnHistory = ({ close }: Props) => {
  const { user } = useUser();
  const [screen, setScreen] = useState<ScreenType>("all");
  const [selectedTxn, setSelectedTxn] = useState<ITransaction | null>(null);
  const [filterParams, setFilterParams] = useState({
    transaction_class_id: 0,
    start_date: "",
    end_date: "",
  });
  const [activity, setActivity] = useState(0);
  const [period, setPeriod] = useState("");
  const [customStartDate, setCustomStartDate] = useState<customDateType>({
    day: "",
    month: "",
    year: "",
  });
  const [customEndDate, setCustomEndDate] = useState<customDateType>({
    day: "",
    month: "",
    year: "",
  });
  const currentWallet = useCurrentWallet(user);

  const { data: activities } = useQuery({
    queryKey: ["transaction-class"],
    queryFn: GetTransactionClasses,
  });

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: [
      "transactions-history",
      { wallet_id: currentWallet?.wallet_id, ...filterParams },
    ],
    queryFn: ({ pageParam = 1 }) => {
      const params: ITransactionParams = {
        wallet_id: currentWallet?.wallet_id || "",
        page: pageParam as number,
        limit: 20,
        ...(filterParams.transaction_class_id && {
          transaction_class_id: filterParams.transaction_class_id,
        }),
        ...(filterParams.start_date && { start_date: filterParams.start_date }),
        ...(filterParams.end_date && { end_date: filterParams.end_date }),
      };
      return FetchTransactionReportApi(params);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination_details?.next_page) return undefined;
      return lastPage.pagination_details.next_page;
    },
    initialPageParam: 1,
    enabled: !!currentWallet?.wallet_id,
  });
  const clearFilters = () => {
    setFilterParams({
      transaction_class_id: 0,
      start_date: "",
      end_date: "",
    });
  };
  const allTransactions =
    data?.pages.flatMap((page) => page.transaction_reports || []) || [];

  const displayScreen = () => {
    switch (screen) {
      case "all":
        return (
          <AllHistory
            close={close}
            data={allTransactions}
            setSelectedTxn={setSelectedTxn}
            setScreen={setScreen}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            filterParams={filterParams}
            activities={activities || []}
            clearFilters={clearFilters}
          />
        );
      case "single":
        return (
          selectedTxn && (
            <TxnReceipt
              transaction={selectedTxn}
              close={() => setScreen("all")}
            />
          )
        );
      case "filter":
        return (
          <FilterHistory
            close={() => setScreen("all")}
            activities={activities || []}
            setParams={setFilterParams}
            period={period}
            activity={activity}
            customEndDate={customEndDate}
            customStartDate={customStartDate}
            setActivity={setActivity}
            setCustomStartDate={setCustomStartDate}
            setCustomEndDate={setCustomEndDate}
            setPeriod={setPeriod}
            clearAll={clearFilters}
          />
        );
      default:
        return null;
    }
  };
  return <div className="h-full">{displayScreen()}</div>;
};

export default TxnHistory;
