"use client";
import { useSendStore } from "@/store/Send";
import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import ListDetailItem from "../ui/ListDetailItem";
import { formatTime, getCurrencySymbol } from "@/utils/helpers";
import { IInitialPayoutResponse } from "@/types/services";
import dayjs from "dayjs";

interface Props {
  goBack: () => void;
  goNext: () => void;
  fee: number;
  paymentData?: IInitialPayoutResponse;
  timeLeft: number;
}
const InternationalSendSummary = ({
  goBack,
  goNext,
  fee,
  paymentData,
  timeLeft,
}: Props) => {
  const {
    category,
    amount,
    purpose,
    intBeneficiary,
    currency: senderCurrency,
  } = useSendStore();
  //   const totalPayable = fee ? parseFloat(amount) + fee : amount;
  const currency =
    intBeneficiary?.foreign_payout_beneficiary?.beneficiary_currency || "";
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-center justify-center mb-4 text-zinc-900">
        <div className="w-12 h-12 mb-4 flex mx-auto items-center justify-center bg-violet-100 bg-opacity-60 rounded-3xl">
          <Image
            className="w-6 h-6"
            src={category?.category_emoji || "/icons/notif-general.svg"}
            alt={category?.transaction_category || ""}
            width={24}
            height={24}
          />
        </div>
        <p className="text-center text-xl font-bold leading-normal">
          {getCurrencySymbol(currency)}
          {amount.toLocaleString()}
        </p>
        <p className="text-center   text-xs font-normal  leading-tight">
          Send Summary
        </p>
      </div>
      <div className="flex flex-col h-full justify-between items-center w-full">
        <div className="w-full flex flex-col gap-[15px]">
          <ListDetailItem
            title="Recipient's name"
            value={
              paymentData?.foreign_payout_beneficiary?.beneficiary_name || ""
            }
          />
          <ListDetailItem
            title="You send"
            value={`${getCurrencySymbol(senderCurrency || "")}
              ${paymentData?.amount.toLocaleString()}`}
          />
          <ListDetailItem
            title="Transaction fee"
            value={`${getCurrencySymbol(senderCurrency || "")}
              ${fee.toLocaleString()}`}
          />
          <ListDetailItem
            title="Exchange rate"
            value={`  ${getCurrencySymbol(currency)}${
              paymentData?.exchange_rate?.toFixed(2) || 1
            } = $1(USD)`}
            border
          />
          <ListDetailItem
            title="Category"
            value={category?.transaction_category || ""}
          />
          <ListDetailItem title="Purpose" value={purpose} />
          <ListDetailItem
            title="Date"
            value={dayjs(paymentData?.created_at).format("DD MMM YYYY @ hh:mm")}
          />
          <div
            className={`flex text-zinc-900 justify-between gap-4 items-start pb-3    `}
          >
            <span className="text-xs font-normal leading-tight">Timer</span>
            <div className="flex gap-1.5 items-center">
              <Image
                src={"/icons/timer.svg"}
                width={20}
                height={20}
                alt="timer"
              />
              <span className="text-sm text-right font-semibold font-brSonoma leading-tight">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button onClick={goNext}>Send</Button>
          <Button onClick={goBack} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InternationalSendSummary;
