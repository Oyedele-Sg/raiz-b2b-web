import Button from "@/components/ui/Button";
import { useSendStore } from "@/store/Send";
import { convertTime, getCurrencySymbol } from "@/utils/helpers";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

interface Props {
  close: () => void;
}

const PendingStatus = ({ close }: Props) => {
  const { transactionDetail } = useSendStore();
  return (
    <div className="w-full h-full bg-gradient-to-l from-indigo-900 to-violet-600 rounded-[36px]  shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30)] inline-flex flex-col justify-center items-center">
      <div className="flex flex-col justify-between gap-6 h-full pt-[88px] p-[30px] items-center">
        <div className="text-center flex flex-col justify-center items-center">
          <Image
            src={"/icons/pending.svg"}
            width={50}
            height={50}
            alt="pending"
          />
          <h4 className="mt-[15px] text-gray-100 text-xl font-bold leading-relaxed">
            Processing Payment
          </h4>
          <p className="text-gray-100 mt-3 text-xs font-normal leading-tight">
            Your transaction is currently pending. Please wait while we process
            it. This may take a few moments.
          </p>
        </div>
        <div className="flex justify-between w-full gap-[15px]">
          <a
            className="w-1/2"
            href={`mailto:support@raiz.app?subject=${encodeURIComponent(
              `Payment Issue - Transaction ${transactionDetail?.transaction_reference}`
            )}&body=${encodeURIComponent(
              `Hello Support Team,\n\nI'm having an issue with a payment. Here are the details:\n` +
                `Reference No: ${transactionDetail?.transaction_reference}\n` +
                `Amount: ${getCurrencySymbol(
                  transactionDetail?.currency || ""
                )}${transactionDetail?.transaction_amount.toFixed(2)}\n` +
                `Date: ${dayjs(
                  convertTime(transactionDetail?.transaction_date_time || "")
                ).format("MMM DD, YYYY")}\n` +
                `Status: ${transactionDetail?.transaction_status.transaction_status}\n\n` +
                `Please assist me with this matter.\nThank you!`
            )}`}
          >
            <Button className="bg-zinc-200 text-zinc-900  whitespace-nowrap">
              Contact Support
            </Button>
          </a>
          <Button onClick={close} className="bg-indigo-900 w-1/2">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PendingStatus;
