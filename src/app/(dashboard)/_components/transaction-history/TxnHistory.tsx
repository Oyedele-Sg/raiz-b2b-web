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

interface Props {
  close: () => void;
}

type ScreenType = "all" | "filter" | "receipt" | "single";
const TxnHistory = ({ close }: Props) => {
  const { user } = useUser();
  const [screen, setScreen] = useState<ScreenType>("all");
  const [selectedTxn, setSelectedTxn] = useState<ITransaction | null>(null);
  const currentWallet = useCurrentWallet(user);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["transactions-history", { wallet_id: currentWallet?.wallet_id }],
    queryFn: ({ pageParam = 1 }) => {
      const params: ITransactionParams = {
        wallet_id: currentWallet?.wallet_id || "",
        page: pageParam as number,
        limit: 20,
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
      default:
        return null;
    }
  };
  return <div>{displayScreen()}</div>;
};

export default TxnHistory;
