import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import Radio from "@/components/ui/Radio";

interface Props {
  close: () => void;
  bankType: "us" | "int" | undefined;
  setBankType: (bankType: "us" | "int") => void;
}

const BankTypeModal = ({ close, bankType, setBankType }: Props) => {
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 w-full">
        <div className="flex justify-between items-start mb-11">
          <div className="">
            <h3 className="text-zinc-900 text-xl font-bold leading-normal">
              Payment type
            </h3>
            <p className="text-zinc-900 text-xs leading-tight">
              Select how you want to pay your recipient
            </p>
          </div>
          <button onClick={close}>
            <Image
              src={"/icons/close.svg"}
              width={16}
              height={16}
              alt="close"
            />
          </button>
        </div>
        <div className="flex  flex-col gap-5">
          <button
            onClick={() => setBankType("us")}
            className={`border  ${
              bankType === "us" ? "border-indigo-900" : "border-zinc-200"
            } rounded-[20px] flex flex-col justify-center items-center w-full pt-[19px] pb-[21px]`}
          >
            <div className="flex justify-between w-full px-[30px] mb-5">
              <span />
              <Image
                width={30}
                height={30}
                src={"/icons/us-bank.svg"}
                alt="USA banks"
              />
              <Radio
                checked={bankType === "us"}
                onChange={() => setBankType("us")}
              />
            </div>
            <p className="text-zinc-900 text-sm font-bold leading-none">
              US Bank
            </p>
            <p className="text-center  text-zinc-900 text-xs font-normal  leading-tight">
              Send to a US bank for free
            </p>
          </button>
          <button
            onClick={() => setBankType("int")}
            className={`border ${
              bankType === "int" ? "border-indigo-900" : "border-zinc-200"
            } rounded-[20px] flex flex-col justify-center items-center w-full pt-[19px] pb-[21px]`}
          >
            <div className="flex justify-between w-full px-[30px] mb-5">
              <span />
              <Image
                width={30}
                height={30}
                src={"/icons/int-bank.svg"}
                alt="international banks"
              />
              <Radio
                checked={bankType === "int"}
                onChange={() => setBankType("int")}
              />
            </div>
            <p className="text-zinc-900 text-sm font-bold leading-none">
              International Bank
            </p>
            <p className="text-center  text-zinc-900 text-xs font-normal  leading-tight">
              Send to an International bank for free
            </p>
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default BankTypeModal;
