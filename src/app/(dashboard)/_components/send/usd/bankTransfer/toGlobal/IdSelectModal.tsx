"use client";
import Overlay from "@/components/ui/Overlay";
import Radio from "@/components/ui/Radio";
import { convertField } from "@/utils/helpers";
import { FormikProps } from "formik";
import React from "react";

interface Props {
  data: string[];
  close: () => void;
  setIdType: (val: string) => void;
  idType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}
const IdSelectModal = ({ data, close, idType, setIdType, formik }: Props) => {
  const handleClick = (val: string) => {
    formik?.setFieldValue("sender_id_type", val);
    formik?.setFieldTouched("sender_id_type", true);
    setIdType(val);
    close();
  };

  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Select ID type
        </h5>
        <div className="flex flex-col gap-4 mt-5 max-h-[450px] overflow-y-scroll no-scrollbar  w-full items-start">
          {data?.map((each, index) => (
            <button
              onClick={() => handleClick(each)}
              className="text-sm font-medium w-full flex gap-2 "
              key={index}
            >
              <Radio
                checked={each === idType}
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

export default IdSelectModal;
