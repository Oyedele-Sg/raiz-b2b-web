"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import ListDetailItem from "../ui/ListDetailItem";
import dayjs from "dayjs";
import { convertTime } from "@/utils/helpers";
import html2canvas from "html2canvas";

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
  const receiptRef = useRef<HTMLDivElement>(null);
  const handleShareReceipt = async () => {
    if (!receiptRef.current) return;
    try {
      // Convert the receipt component to canvas
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const dataUrl = canvas.toDataURL("image/png");
      // const response = await fetch(dataUrl);
      // const blob = await response.blob();
      // const file = new File([blob], `receipt-${referenceNumber}.png`, {
      //   type: "image/png",
      // });
      const link = document.createElement("a");
      link.download = `receipt-${referenceNumber}.png`;
      link.href = dataUrl;
      link.click();

      link.remove();
    } catch (error) {
      console.error("Error generating receipt:", error);
      alert("Failed to generate receipt. Please try again.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleShareReceipt();
      // Optionally close the modal after download
      // close();
    }, 500);

    // Cleanup timeout on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <button onClick={close}>
        <Image src={"/icons/close.svg"} alt="close" width={16} height={16} />
      </button>
      <div
        ref={receiptRef}
        className="flex mt-10 relative flex-col items-center justify-center mb-4 text-zinc-900 border-t border-r border-l  rounded-t-xl border-stone-700/30"
      >
        <Image
          className="absolute -top-6  -translate-x-1/2 left-1/2"
          src={"/icons/logoWText.svg"}
          alt="logo"
          width={55}
          height={55}
        />
        <h6 className="text-zinc-700 text-xs mt-10 font-normal leading-tight">
          Receipt
        </h6>
        <p className=" text-zinc-900 text-xl font-bold mt-[5px]  leading-normal">
          {currency}
          {transactionAmount?.toLocaleString()}
        </p>
        <div className="flex flex-col gap-2  w-full  mt-5 px-5 lg:px-2 xl:px-5 pt-5 border-t border-dashed border-zinc-200">
          {/* Beneficiary */}
          <ListDetailItem title="Beneficiary" value={beneficiaryName} />
          <ListDetailItem title="Sender" value={senderName} />
          {senderAccount && (
            <ListDetailItem title="Account Debited" value={senderAccount} />
          )}
          {beneficiaryAccount && (
            <ListDetailItem
              title="Receiver Account"
              value={beneficiaryAccount}
            />
          )}
          {beneficiaryBank && (
            <ListDetailItem title="Receiver Bank" value={beneficiaryBank} />
          )}
          <ListDetailItem title="Purpose" value={purpose} />
          <ListDetailItem
            title="Date"
            value={dayjs(convertTime(date)).format("MMM DD, YYYY")}
          />
          <ListDetailItem
            title="Time"
            value={dayjs(convertTime(date)).format("hh:mm a")}
          />
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
        <div className="rounded-b-xl mt-7 bg-primary flex gap-3 px-5 py-4 items-center">
          <div className="bg-white flex justify-center items-center w-11 h-11 px-0.5 rounded">
            <Image
              className="w-10 h-10"
              src={"/icons/qr.svg"}
              width={40}
              height={40}
              alt="qr"
            />
          </div>
          <p className="text-white text-sm font-bold leading-none">
            Download the <span className=" text-amber-300">Raiz App</span> using
            the QR Code
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaizReceipt;
