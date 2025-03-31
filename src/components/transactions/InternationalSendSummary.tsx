"use client";
import { useSendStore } from "@/store/Send";
import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import ListDetailItem from "../ui/ListDetailItem";
import { getCurrencySymbol } from "@/utils/helpers";

interface Props {
  goBack: () => void;
  goNext: () => void;
  fee: number;
}
const InternationalSendSummary = ({ goBack, goNext, fee }: Props) => {
  const {
    category,
    amount,
    purpose,
    intBeneficiary,
    currency: senderCurrency,
  } = useSendStore();
  console.log("sellee", senderCurrency);
  //   const totalPayable = fee ? parseFloat(amount) + fee : amount;
  const currency =
    intBeneficiary?.foreign_payout_beneficiary?.beneficiary_currency || "";
  return (
    <div>
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
      <div className="flex flex-col lg:h-[75vh] justify-between items-center w-full">
        <div className="w-full flex flex-col gap-[15px]">
          {/* Amount */}
          <ListDetailItem
            title="Amount"
            value={`${getCurrencySymbol(currency)}
              ${amount.toLocaleString()}`}
          />
          <ListDetailItem
            title="Transaction fee"
            value={`${getCurrencySymbol(senderCurrency || "")}
              ${fee.toLocaleString()}`}
          />
          <ListDetailItem title="Purpose" value={purpose} />
          <ListDetailItem
            title="Category"
            value={category?.transaction_category || ""}
          />
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
