"use client";
import { GetRaizedinfo } from "@/app/(auth)/register/_components/forms/Congrats";
import Button from "@/components/ui/Button";
import { getCurrencySymbol } from "@/utils/helpers";
import Image from "next/image";
import React, { useState } from "react";
import SideModalWrapper from "../../_components/SideModalWrapper";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useSendStore } from "@/store/Send";
import { IBusinessPaymentData } from "@/types/services";

interface Props {
  data: IBusinessPaymentData;
}

const PaySuccess = ({ data }: Props) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const { transactionDetail } = useSendStore();

  console.log("deeetails", transactionDetail);

  const closeReceipt = () => {
    setShowReceipt(false);
  };
  return (
    <div className="w-full flex flex-col h-full mt-11 ">
      <div className="flex flex-col h-full  w-full">
        <Image
          src={"/icons/success.svg"}
          width={40}
          height={40}
          alt="success"
        />
        <div className="mb-10">
          <h2 className="text-raiz-gray-950 text-[23px] font-semibold  leading-10">
            Payment of {getCurrencySymbol(transactionDetail?.currency || "")}
            {transactionDetail?.transaction_amount.toLocaleString()} sent to{" "}
            {data?.account_user?.username}
          </h2>
          <p className="text-raiz-gray-700 font-[15px] ">
            Success! The store has received your payment{" "}
          </p>
        </div>

        <h3 className="text-raiz-gray-950 text-lg font-bold  leading-[21.6px]">
          Do more. Get more. Raiz AM.
        </h3>
        <p className="text-sm text-raiz-gray-950">
          Check out everything you unlock with the app. 🌟💰
        </p>
        <div className="flex flex-col mt-8 flex-colgap-4 xl:gap-6 p-[30px] rounded-[20px] bg-[rgba(234,236,255,0.60)]">
          {GetRaizedinfo.map((each, index) => (
            <div key={index} className="flex gap-4">
              {each.svg}
              <div className="flex flex-col gap-1">
                <p className=" text-raiz-gray-900 text-sm font-bold  leading-[16.80px]">
                  {each.title}
                </p>
                <p className="text-raiz-gray-600 text-[13px] font-normal  leading-tight">
                  {each.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 mt-8">
          {/* <div className="p-5 bg-indigo-100/60 rounded-[20px] inline-flex justify-start items-center gap-4">
            <div className="text-zinc-900 text-xs leading-tight flex items-center">
              Use code <span className="font-semibold mx-1.5">KHADARO12</span>{" "}
              to get 10% off first transfer, only{" "}
              <span className="font-semibold mr-1.5">14:59</span> left!
              <button onClick={() => copyToClipboard("KHADARO12")}>
                <Image
                  src={"/icons/copy.svg"}
                  alt={"copy"}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div> */}
          <Button variant="primary">Download Raiz App</Button>
          <Button variant="secondary" onClick={() => setShowReceipt(true)}>
            View Receipt
          </Button>
        </div>
      </div>
      {showReceipt && transactionDetail && (
        <SideModalWrapper close={() => {}}>
          <RaizReceipt close={closeReceipt} data={transactionDetail} />
        </SideModalWrapper>
      )}
    </div>
  );
};

export default PaySuccess;
