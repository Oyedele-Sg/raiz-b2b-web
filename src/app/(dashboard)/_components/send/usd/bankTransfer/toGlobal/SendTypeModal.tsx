import Overlay from "@/components/ui/Overlay";
import Radio from "@/components/ui/Radio";
import { convertField } from "@/utils/helpers";
import React from "react";
import { FormikProps } from "formik";

interface Props {
  data: string[];
  close: () => void;
  setSendType: (arg: string) => void;
  sendType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: FormikProps<any>;
}

const SendTypeModal = ({
  setSendType,
  close,
  data,
  sendType,
  formik,
}: Props) => {
  const handleClick = (val: string) => {
    formik?.setFieldValue("sender", val);
    formik?.setFieldTouched("sender", true);
    setSendType(val);
    close();
  };
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Send Type
        </h5>
        <div className="flex flex-col gap-4 mt-5 w-full items-start">
          {data?.map((each, index) => (
            <button
              onClick={() => handleClick(each)}
              className="text-sm font-medium w-full flex gap-2 "
              key={index}
            >
              <Radio
                checked={each === sendType}
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

export default SendTypeModal;
