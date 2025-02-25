import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { usdSendOptions } from "@/constants/send";
import { IUsdSendOptions } from "@/types/misc";

interface Props {
  close: () => void;
  setSelectedOption: Dispatch<SetStateAction<IUsdSendOptions | "all">>;
}

const SendOptions = ({ close, setSelectedOption }: Props) => {
  return (
    <div>
      <button onClick={close}>
        <Image
          src={"/icons/arrow-left.svg"}
          alt="back"
          width={18.48}
          height={18.48}
        />
      </button>
      <div className="flex justify-between mt-4 mb-11">
        <div className="">
          <h5 className="text-raiz-gray-950 text-[23px] font-semibold leading-10">
            Choose your send option
          </h5>
          <p className="text-raiz-gray-700 text-[15px] font-normal leading-snug">
            Select your preferred send action
          </p>
        </div>
        <Image
          src={"/icons/send-2.svg"}
          alt="back"
          width={40}
          height={40}
          className="w-10  h-10"
        />
      </div>
      {/* options */}
      <div className="flex flex-col gap-0.5 mt-11 ">
        {usdSendOptions.map((each, index) => {
          return (
            <button
              className="px-4 py-5 hover:bg-[#e5ebff]/60 rounded-[20px] justify-between items-center inline-flex"
              key={index}
              onClick={() => setSelectedOption(each.key)}
            >
              <div className="flex items-center gap-2">
                <div className="">{each.icon}</div>
                <div className="flex flex-col items-start gap-1">
                  <p className="text-raiz-gray-950 text-sm font-bold  leading-[16.80px]">
                    {each.title}
                  </p>
                  <p className="text-raiz-gray-950 text-[13px] font-normal  leading-[18.20px] text-left">
                    {each.subtitle}
                  </p>
                </div>
              </div>
              <Image
                src={"/icons/arrow-right.svg"}
                alt=""
                width={20}
                height={20}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SendOptions;
