"use client";
import { GetRaizedinfo } from "@/app/(auth)/register/_components/forms/Congrats";
import Button from "@/components/ui/Button";
import { getCurrencySymbol } from "@/utils/helpers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SideModalWrapper from "../../_components/SideModalWrapper";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useSendStore } from "@/store/Send";
import { IBusinessPaymentData } from "@/types/services";
import Link from "next/link";

interface Props {
  data: IBusinessPaymentData;
  senderName: string;
}

const PaySuccess = ({ data, senderName }: Props) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const { transactionDetail } = useSendStore();

  const [downloadLink, setDownloadLink] = useState(
    "https://raizapp.onelink.me/RiOx/webdirect"
  );

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.platform || "";

    if (/android/i.test(userAgent)) {
      setDownloadLink(
        "https://play.google.com/store/apps/details?id=com.raiz.application"
      );
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setDownloadLink("https://apps.apple.com/us/app/raiz-mobile/id6473565462");
    } else {
      setDownloadLink("https://raizapp.onelink.me/RiOx/webdirect");
    }
  }, []);

  const closeReceipt = () => {
    setShowReceipt(false);
  };

  return (
    <div className="w-full flex flex-col h-full mt-11 ">
      <div className="flex flex-col justify-between h-full  w-full">
        <div>
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
          <div className="flex flex-col mt-8  gap-4 xl:gap-6 p-[30px] rounded-[20px] bg-[rgba(234,236,255,0.60)]">
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
          <Link href={downloadLink} target="_blank">
            <Button variant="primary">Download Raiz App</Button>{" "}
          </Link>
          <Button variant="secondary" onClick={() => setShowReceipt(true)}>
            View Receipt
          </Button>
        </div>
      </div>
      {showReceipt && transactionDetail && (
        <SideModalWrapper close={() => {}}>
          <RaizReceipt
            close={closeReceipt}
            data={transactionDetail}
            type="guest"
            senderName={senderName}
          />
        </SideModalWrapper>
      )}
    </div>
  );
};

export default PaySuccess;
