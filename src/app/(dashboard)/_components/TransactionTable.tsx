"use client";

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ITransactionParams } from "@/types/services";
import { FetchTransactionReportApi } from "@/services/transactions";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { findWalletByCurrency } from "@/utils/helpers";
import { useUser } from "@/lib/hooks/useUser";
import { ITransaction } from "@/types/transactions";
import Skeleton from "react-loading-skeleton";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { useSendStore } from "@/store/Send";
import NgnSend from "./send/naira/NgnSend";
import UsdSend from "./send/usd/UsdSend";
import { AnimatePresence } from "motion/react";
import SideModalWrapper from "./SideModalWrapper";

const columnHelper = createColumnHelper<ITransaction>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<ITransaction, any>[] = [
  columnHelper.accessor("third_party_name", {
    header: "Transaction",
    cell: (info) => (
      <div className="flex items-center gap-2 font-brSonoma">
        <Avatar
          name=""
          src={info?.row?.original?.third_party_profile_image_url}
        />
        <span className="text-sm font-medium text-raiz-gray-950">
          {info.getValue()}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("transaction_amount", {
    header: "Amount",
    cell: (info) => {
      const isDebit =
        info.row.original?.transaction_type?.transaction_type === "debit";

      return (
        <span
          className={`text-sm font-normal  font-brSonoma ${
            isDebit ? " text-raiz-gray-700" : "text-[#079455]"
          }`}
        >
          {isDebit ? "-" : "+"}${Math.abs(info?.getValue()).toLocaleString()}
        </span>
      );
    },
  }),
  columnHelper.accessor("transaction_category.transaction_category", {
    header: "Category",
    cell: (info) => {
      if (info?.row?.original?.transaction_category?.transaction_category) {
        return (
          <div className="w-fit flex items-center px-1.5 py-0.5 gap-1 text-xs font-brSonoma border border-raiz-gray-200 rounded-md">
            {info.getValue()}
          </div>
        );
      } else {
        return null;
      }
    },
  }),
  columnHelper.accessor("transaction_date_time", {
    header: "Date",
    cell: (info) => (
      <span className="text-sm font-brSonoma text-raiz-gray-700">
        {dayjs(info.getValue()).format("DD MMM YYYY @ h:mm A")}
      </span>
    ),
  }),
  columnHelper.accessor("transaction_status.transaction_status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const dotColor =
        status === "completed"
          ? "bg-green-500"
          : status === "pending"
          ? "bg-yellow-500"
          : "bg-red-500";

      return (
        <div className="w-fit flex items-center px-1.5 py-0.5 gap-1 text-xs font-brSonoma border border-raiz-gray-200 rounded-md">
          <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
          {status}
        </div>
      );
    },
  }),
];

const TransactionTable = () => {
  const { user } = useUser();
  const { selectedCurrency } = useCurrencyStore();
  const NGNAcct = findWalletByCurrency(user, "NGN");
  const USDAcct = findWalletByCurrency(user, "USD");
  const { currency } = useSendStore();
  const [showSend, setShowSend] = useState(false);
  const getCurrentWallet = () => {
    if (selectedCurrency.name === "NGN") {
      return NGNAcct;
    } else if (selectedCurrency.name === "USD") {
      return USDAcct;
    }
  };

  const currentWallet = getCurrentWallet();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["transactions-report", { wallet_id: currentWallet?.wallet_id }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, ITransactionParams];
      return FetchTransactionReportApi(params);
    },
    enabled: !!currentWallet?.wallet_id,
  });
  const pathName = usePathname();
  useEffect(() => {
    refetch();
  }, [pathName, refetch]);
  const transactions = data?.transaction_reports || [];
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="w-full mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold  leading-snug text-raiz-gray-900">
          Transaction history
        </h3>
        <Link
          className="text-raiz-gray-700 text-sm font-bold py-2 px-3.5  border border-[#E4E0EA] shadow rounded-md"
          href={"#"}
        >
          See more
        </Link>
      </div>
      {transactions.length > 0 ? (
        <div className="w-full overflow-x-auto ">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="whitespace-nowrap">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-4 text-raiz-gray-700 text-[13px] font-normal font-monzo"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={5}>
                    <Skeleton count={4} className="mb-3" height={48} />
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 whitespace-nowrap"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center  items-center bg-[url('/images/txnBg.png')] bg-no-repeat bg-bottom py-6 pb-12">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M15.9998 29.3332C23.3636 29.3332 29.3332 23.3636 29.3332 15.9998C29.3332 8.63604 23.3636 2.6665 15.9998 2.6665C8.63604 2.6665 2.6665 8.63604 2.6665 15.9998C2.6665 23.3636 8.63604 29.3332 15.9998 29.3332Z"
              fill="#ECC8FF"
            />
            <path
              d="M20.2706 18.3852L18.7146 16.3732C18.248 15.7692 17.964 15.0438 17.8946 14.2838L17.3333 7.99984C17.3333 7.26384 16.736 6.6665 16 6.6665C15.264 6.6665 14.6666 7.26384 14.6666 7.99984L14.1586 14.5132C14.0586 15.7932 14.58 17.0438 15.56 17.8745L18.3853 20.2705C18.9066 20.7918 19.7506 20.7918 20.2706 20.2705C20.792 19.7505 20.792 18.9052 20.2706 18.3852Z"
              fill="#B35EE1"
            />
          </svg>
          <h2 className="text-raiz-gray-950 text-sm font-semibold mb-[14px]">
            No transactions yet
          </h2>
          <p className="w-80 mb-6 text-center text-raiz-gray-950 text-xs leading-none">
            Once transactions start flowing in, you&#39;ll see them listed here
            in real time.
          </p>
          <Button
            onClick={() => setShowSend(true)}
            className="h-10 w-[191px] px-[18px] py-2  rounded-3xl justify-center items-center gap-1.5 inline-flex"
          >
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M13.7836 2.4667L6.25859 4.9667C1.20026 6.65837 1.20026 9.4167 6.25859 11.1L8.49193 11.8417L9.23359 14.075C10.9169 19.1334 13.6836 19.1334 15.3669 14.075L17.8753 6.55837C18.9919 3.18337 17.1586 1.3417 13.7836 2.4667ZM14.0503 6.95004L10.8836 10.1334C10.7586 10.2584 10.6003 10.3167 10.4419 10.3167C10.2836 10.3167 10.1253 10.2584 10.0003 10.1334C9.75859 9.8917 9.75859 9.4917 10.0003 9.25004L13.1669 6.0667C13.4086 5.82504 13.8086 5.82504 14.0503 6.0667C14.2919 6.30837 14.2919 6.70837 14.0503 6.95004Z"
                fill="#FDFDFD"
              />
            </svg>
            <span className="text-[#fcfcfc] lg:text-sm xl:text-base font-medium font-brSonoma leading-tight tracking-tight">
              Send Money
            </span>
          </Button>
        </div>
      )}
      <AnimatePresence>
        {showSend ? (
          currency === "NGN" ? (
            <SideModalWrapper close={() => setShowSend(false)}>
              <NgnSend />
            </SideModalWrapper>
          ) : (
            <SideModalWrapper close={() => setShowSend(false)}>
              <UsdSend close={() => setShowSend(false)} />
            </SideModalWrapper>
          )
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default TransactionTable;
