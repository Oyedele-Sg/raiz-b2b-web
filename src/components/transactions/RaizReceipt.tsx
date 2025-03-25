"use client";
import Image from "next/image";
import React from "react";
import ListDetailItem from "../ui/ListDetailItem";
import dayjs from "dayjs";

export interface IRaizReceipt {
  senderName: string;
  beneficiaryName: string;
  beneficiaryAccount: string;
  beneficiaryBank: string;
  senderAccount: string;
  transactionAmount: number;
  purpose: string;
  date: Date;
  transactionType: string;
  sessionId: string;
  referenceNumber: string;
  status: string;
  currency: string;
  close: () => void;
}

const RaizReceipt = ({
  senderName,
  beneficiaryName,
  currency,
  senderAccount,
  transactionAmount,
  beneficiaryAccount,
  beneficiaryBank,
  referenceNumber,
  purpose,
  date,
  transactionType,
  sessionId,
  status,
  close,
}: IRaizReceipt) => {
  return (
    <div>
      <button onClick={close}>
        <Image src={"/icons/close.svg"} alt="close" width={16} height={16} />
      </button>
      <div className="flex mt-10 relative flex-col items-center justify-center mb-4 text-zinc-900 border py-10 rounded-xl border-stone-700/30">
        <Image
          className="absolute -top-6  -translate-x-1/2 left-1/2"
          src={"/icons/logoWText.svg"}
          alt="logo"
          width={55}
          height={55}
        />
        <h6 className="text-zinc-700 text-xs font-normal leading-tight">
          Receipt
        </h6>
        <p className=" text-zinc-900 text-xl font-bold mt-[5px]  leading-normal">
          {currency}
          {transactionAmount?.toLocaleString()}
        </p>
        <div className="flex flex-col gap-2  w-full  mt-5 px-5 pt-5 border-t border-dashed border-zinc-200">
          {/* Beneficiary */}
          <ListDetailItem title="Beneficiary" value={beneficiaryName} />
          <ListDetailItem title="Sender" value={senderName} />
          <ListDetailItem title="Account Debited" value={senderAccount} />
          <ListDetailItem title="Receiver Account" value={beneficiaryAccount} />
          <ListDetailItem title="Receiver Bank" value={beneficiaryBank} />
          <ListDetailItem title="Purpose" value={purpose} />
          <ListDetailItem
            title="Date"
            value={dayjs(date).format("MMM DD, YYYY")}
          />
          <ListDetailItem title="Time" value={dayjs(date).format("hh:mm a")} />
          <ListDetailItem title="Transaction Type" value={transactionType} />
          <ListDetailItem title="SessionID" value={sessionId} />
          <ListDetailItem title="Reference Number" value={referenceNumber} />
          <div className="flex justify-between items-center border-t border-zinc-200 pt-[18px]">
            <span className="text-xs font-normal leading-tight">Status</span>
            <span
              className={`${
                status === "completed"
                  ? "text-green-600"
                  : status === "failed"
                  ? "text-red-600"
                  : "text-orange-400"
              } text-sm font-semibold leading-snug`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaizReceipt;
