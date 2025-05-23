import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import Radio from "@/components/ui/Radio";
import { canadaSendType } from "./ToCanada";

interface Props {
  close: () => void;
  type: canadaSendType | undefined;
  setType: (type: canadaSendType) => void;
}

const CanadaTypeModal = ({ type, close, setType }: Props) => {
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 w-full">
        <div className="flex justify-between items-start mb-11">
          <div className="">
            <h3 className="text-zinc-900 text-xl font-bold leading-normal">
              Send to Canada
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
          {/* interac */}
          <button
            onClick={() => setType("interac")}
            className={`border ${
              type === "interac" ? "border-indigo-900" : "border-zinc-200"
            } rounded-[20px] flex flex-col justify-center items-center w-full pt-[19px] pb-[21px]`}
          >
            <div className="flex justify-between w-full px-[30px] mb-5">
              <span />
              <Image
                width={30}
                height={30}
                src={"/icons/interac.svg"}
                alt="Interac"
              />
              <Radio
                checked={type === "interac"}
                onChange={() => setType("interac")}
              />
            </div>
            <p className="text-zinc-900 text-sm font-bold leading-none">
              Interac
            </p>
            <p className="text-center  text-zinc-900 text-xs font-normal  leading-tight">
              Instant payments
            </p>
          </button>
          {/* Eft */}
          <button
            onClick={() => setType("eft")}
            className={`border ${
              type === "eft" ? "border-indigo-900" : "border-zinc-200"
            } rounded-[20px] flex flex-col justify-center items-center w-full pt-[19px] pb-[21px]`}
          >
            <div className="flex justify-between w-full px-[30px] mb-5">
              <span />
              <Image width={66} height={26} src={"/icons/eft.svg"} alt="EFT" />
              <Radio checked={type === "eft"} onChange={() => setType("eft")} />
            </div>
            <p className="text-zinc-900 text-sm font-bold leading-none">EFT</p>
            <p className="text-center  text-zinc-900 text-xs font-normal  leading-tight">
              24 - 48 hours
            </p>
          </button>
          {/* Tuition */}
          {/* <button
            onClick={() => setType("tuition")}
            className={`border ${
              type === "tuition" ? "border-indigo-900" : "border-zinc-200"
            } rounded-[20px] flex flex-col justify-center items-center w-full pt-[19px] pb-[21px]`}
          >
            <div className="flex justify-between w-full px-[30px] mb-5">
              <span />
              <Image
                width={30}
                height={30}
                src={"/icons/tuition.svg"}
                alt="Pay Tuition"
              />
              <Radio
                checked={type === "tuition"}
                onChange={() => setType("tuition")}
              />
            </div>
            <p className="text-zinc-900 text-sm font-bold leading-none">
              Pay Tuition
            </p>
            <p className="text-center  text-zinc-900 text-xs font-normal  leading-tight">
              Send CAD USD to institution
            </p>
          </button> */}
        </div>
      </div>
    </Overlay>
  );
};

export default CanadaTypeModal;
