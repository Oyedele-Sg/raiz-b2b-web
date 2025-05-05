import Overlay from "@/components/ui/Overlay";
import Radio from "@/components/ui/Radio";
import { convertField } from "@/utils/helpers";
import { FormikProps } from "formik";
import React from "react";

export interface IBeneficiaryBank {
  id: number;
  code: string;
  name: string;
}

interface Props {
  data: IBeneficiaryBank[];
  close: () => void;
  setSelectedBank: (val: IBeneficiaryBank) => void;
  selectedBank: IBeneficiaryBank;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}

const BankSelectModal = ({
  data,
  close,
  setSelectedBank,
  selectedBank,
  formik,
}: Props) => {
  const handleClick = (val: IBeneficiaryBank) => {
    formik.setFieldValue("bank_code", val.id.toString());
    formik.setFieldTouched("bank_code", true);
    setSelectedBank(val);
    close();
  };

  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Select Bank
        </h5>
        <div className="flex flex-col gap-4 mt-5 w-full items-start h-[350px] overflow-y-scroll ">
          {data?.map((each, index) => (
            <button
              onClick={() => {
                handleClick(each);
              }}
              className="text-sm font-medium w-full flex gap-2 text-left "
              key={index}
            >
              <Radio
                checked={each.id === selectedBank.id}
                onChange={() => handleClick(each)}
              />
              {convertField(each.name)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4"></div>
    </Overlay>
  );
};

export default BankSelectModal;
