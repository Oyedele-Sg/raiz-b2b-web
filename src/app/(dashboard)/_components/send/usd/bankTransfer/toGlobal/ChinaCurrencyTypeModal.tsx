"use client";
import Overlay from "@/components/ui/Overlay";
import Radio from "@/components/ui/Radio";
import { convertField } from "@/utils/helpers";
import React from "react";

interface Props {
  close: () => void;
  setBankCurrency: (arg: "CNY" | "USD") => void;
  bankCurrency: "CNY" | "USD";
}

const ChinaCurrencyTypeModal = ({
  close,
  setBankCurrency,
  bankCurrency,
}: Props) => {
  const handleClick = (val: "CNY" | "USD") => {
    close();
    setBankCurrency(val);
  };

  const data = ["CNY", "USD"] as const;

  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Choose preferred bank currency
        </h5>
        <div className="flex flex-col gap-4 mt-5 max-h-[450px] overflow-y-scroll no-scrollbar  w-full items-start">
          {data?.map((each, index) => (
            <button
              onClick={() => handleClick(each)}
              className="text-sm font-medium w-full flex gap-2 uppercase "
              key={index}
            >
              <Radio
                checked={each === bankCurrency}
                onChange={() => handleClick(each)}
              />
              {convertField(each)}
            </button>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default ChinaCurrencyTypeModal;
