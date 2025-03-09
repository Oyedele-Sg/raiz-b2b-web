import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import { copyToClipboard } from "@/utils/helpers";

interface Props {
  close: () => void;
}

const USDAcctInfo = ({ close }: Props) => {
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5  text-raiz-gray-950">
        <div className="bg-[#EAECFF99] w-12 h-12 rounded-full flex justify-center items-center mx-auto">
          <Image
            src={"/icons/info.svg"}
            alt={"Account Info"}
            width={24}
            height={24}
          />
        </div>
        <h4 className="text-lg font-bold leading-snug text-center mt-4 mb-6">
          Account Info
        </h4>
        {/* Acct details */}
        <div className="flex flex-col gap-[15px]">
          {/* Bank Name */}
          <div className="flex justify-between items-center border-b border-[#e4e0ea] pb-3">
            <span className="text-[13px] font-normal leading-tight">
              Bank Name
            </span>
            <span className="text-sm font-semibold leading-none">
              JP Morgan Chase
            </span>
          </div>

          {/* Account Number */}
          <div className="flex justify-between items-center border-b border-[#e4e0ea] pb-3">
            <span className="text-[13px] font-normal leading-tight">
              Account Number
            </span>
            <div className="flex gap-1 items-center">
              {" "}
              <span className="text-sm font-semibold leading-none">
                0460000500
              </span>
              <button onClick={() => copyToClipboard("0460000500")}>
                <Image
                  src={"/icons/copy.svg"}
                  alt={"copy"}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>

          {/* Routing Number (ACH) */}
          <div className="flex justify-between items-center border-b border-[#e4e0ea] pb-3">
            <span className="text-[13px] font-normal leading-tight">
              Routing Number (ACH)
            </span>
            <div className="flex gap-1 items-center">
              {" "}
              <span className="text-sm font-semibold leading-none">
                000000000000
              </span>
              <button onClick={() => copyToClipboard("000000000000")}>
                <Image
                  src={"/icons/copy.svg"}
                  alt={"copy"}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>

          {/* Routing Number (WIRE) */}
          <div className="flex justify-between items-center border-b border-[#e4e0ea] pb-3">
            <span className="text-[13px] font-normal leading-tight">
              Routing Number (WIRE)
            </span>
            <div className="flex gap-1 items-center">
              {" "}
              <span className="text-sm font-semibold leading-none">
                000000100000
              </span>
              <button onClick={() => copyToClipboard("000000100000")}>
                <Image
                  src={"/icons/copy.svg"}
                  alt={"copy"}
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>

          {/* Currency */}
          <div className="flex justify-between items-center border-b border-[#e4e0ea] pb-3">
            <span className="text-[13px] font-normal leading-tight">
              Currency
            </span>
            <span className="text-sm font-semibold leading-none">USD</span>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default USDAcctInfo;
