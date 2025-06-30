"use client";
import Overlay from "@/components/ui/Overlay";
import Radio from "@/components/ui/Radio";
import { convertField } from "@/utils/helpers";
import React from "react";
import { cnBenType } from "./CNBeneficiaryForm";

interface Props {
  data: cnBenType[];
  close: () => void;
  setType: (arg: cnBenType) => void;
  type: cnBenType;
}

const CnTypeModal = ({ setType, close, type, data }: Props) => {
  const handleClick = (val: cnBenType) => {
    close();
    setType(val);
  };
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Beneficiary Type
        </h5>
        <div className="flex flex-col gap-4 mt-5 w-full items-start">
          {data?.map((each, index) => (
            <button
              onClick={() => handleClick(each)}
              className="text-sm font-medium w-full flex gap-2 "
              key={index}
            >
              <Radio
                checked={each === type}
                onChange={() => handleClick(each)}
              />
              {convertField(each || "")}
            </button>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default CnTypeModal;
