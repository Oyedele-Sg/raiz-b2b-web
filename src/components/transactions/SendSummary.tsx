"use client";
import { useSendStore } from "@/store/Send";
import React from "react";
import Image from "next/image";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import Button from "../ui/Button";

interface Props {
  goBack: () => void;
  goNext: () => void;
  fee: number;
}

const SendSummary = ({ goBack, goNext, fee }: Props) => {
  const { category, amount, purpose } = useSendStore();
  const { selectedCurrency } = useCurrencyStore();

  const totalPayable = fee ? parseFloat(amount) + fee : 0;

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
          {selectedCurrency?.sign}
          {totalPayable.toLocaleString()}
        </p>
        <p className="text-center   text-xs font-normal  leading-tight">
          Send Summary
        </p>
      </div>
      <div className="flex flex-col lg:h-[75vh] justify-between items-center w-full">
        <div className="w-full flex flex-col gap-[15px]">
          {/* Amount */}
          <div className="flex text-zinc-900 justify-between items-center pb-3 border-b-[0.5px] border-zinc-200">
            <span className="text-xs font-normal leading-tight">Amount</span>
            <span className=" text-sm font-semibold font-brSonoma leading-tight">
              {" "}
              {selectedCurrency?.sign}
              {amount.toLocaleString()}{" "}
            </span>
          </div>
          {/* Transaction fee */}
          <div className="flex text-zinc-900 justify-between items-center pb-3 border-b-[0.5px] border-zinc-200">
            <span className="text-xs font-normal leading-tight">
              Transaction fee
            </span>
            <span className=" text-sm font-semibold font-brSonoma leading-tight">
              {" "}
              {selectedCurrency?.sign}
              {fee?.toLocaleString()}{" "}
            </span>
          </div>

          {/* Purpose */}
          <div className="flex text-zinc-900 justify-between items-center pb-3 border-b-[0.5px] border-zinc-200">
            <span className="text-xs font-normal leading-tight">Purpose</span>
            <span className=" text-sm font-semibold font-brSonoma leading-tight">
              {purpose}
            </span>
          </div>

          {/* Category */}
          <div className="flex text-zinc-900 justify-between items-center pb-3">
            <span className="text-xs font-normal leading-tight">Category</span>
            <span className=" text-sm font-semibold font-brSonoma leading-tight">
              {category?.transaction_category}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button disabled={!fee} onClick={goNext}>
            Send
          </Button>
          <Button onClick={goBack} variant="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendSummary;
