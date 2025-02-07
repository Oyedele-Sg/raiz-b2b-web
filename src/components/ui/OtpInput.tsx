"use client";
import React from "react";
import OTPInput from "react-otp-input";
import ErrorMessage from "@/components/ui/ErrorMessage";

type OtpInputProps = {
  value: string;
  onChange: (val: string) => void;
  error?: string;
  touched?: boolean;
};

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  error,
  touched,
}) => {
  return (
    <div>
      <OTPInput
        value={value}
        onChange={onChange}
        numInputs={4}
        renderSeparator={<span> </span>}
        renderInput={(props) => (
          <input
            {...props}
            className="!w-[60px] !h-[60px] xl:!w-[80px] xl:!h-[80px] p-2 focus:bg-[#fcfcfc] bg-raiz-gray-100 rounded-[14.57px] border focus:border-raiz-gray-800 outline-none flex-col justify-center items-center gap-2 inline-flex mr-3 text-raiz-gray-950 text-xl font-normal"
          />
        )}
      />
      {touched && error && <ErrorMessage message={error} />}
    </div>
  );
};

export default OtpInput;
