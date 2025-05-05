import Overlay from "@/components/ui/Overlay";
import Radio from "@/components/ui/Radio";
import { convertField } from "@/utils/helpers";
import React from "react";
import { FormikProps } from "formik";

interface Props {
  data: string[];
  close: () => void;
  setRemittancePurpose: (arg: string) => void;
  remittancePurpose: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: FormikProps<any>;
}
const PurposeModal = ({
  data,
  close,
  setRemittancePurpose,
  remittancePurpose,
  formik,
}: Props) => {
  const handleClick = (val: string) => {
    formik?.setFieldValue("remittance_purpose", val);
    formik?.setFieldTouched("remittance_purpose", true);
    setRemittancePurpose(val);
    close();
  };

  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Select Remittance Purpose
        </h5>
        <div className="flex flex-col gap-4 mt-5 max-h-[450px] overflow-y-scroll no-scrollbar  w-full items-start">
          {data?.map((each, index) => (
            <button
              onClick={() => handleClick(each)}
              className="text-sm font-medium w-full flex gap-2 "
              key={index}
            >
              <Radio
                checked={each === remittancePurpose}
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

export default PurposeModal;
