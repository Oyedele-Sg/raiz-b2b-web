// components/NumberKeypad.tsx
import Image from "next/image";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import OTPInput from "react-otp-input";

interface NumberKeypadProps {
  onInputChange?: (value: string) => void;
  maxLength?: number;
  otpValue: string;
  setOtpValue: Dispatch<SetStateAction<string>>;
}

const NumberKeypad: React.FC<NumberKeypadProps> = ({
  onInputChange,
  maxLength = 4,
  otpValue = "",
  setOtpValue,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNumberClick = (number: string) => {
    if (currentIndex < maxLength) {
      const newValue = otpValue + number;
      setOtpValue(newValue);
      setCurrentIndex(currentIndex + 1);

      if (onInputChange) {
        onInputChange(newValue);
      }
    }
  };

  const handleBackspace = () => {
    if (currentIndex > 0) {
      const newValue = otpValue.slice(0, -1);
      setOtpValue(newValue);
      setCurrentIndex(currentIndex - 1);

      if (onInputChange) {
        onInputChange(newValue);
      }
    }
  };

  const handleOtpChange = useCallback(
    (value: string) => {
      const sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, maxLength); // Allow only numbers, limit to maxLength
      setOtpValue(sanitizedValue);
      setCurrentIndex(sanitizedValue.length);
      if (onInputChange) {
        onInputChange(sanitizedValue);
      }
    },
    [maxLength, onInputChange]
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <OTPInput
        value={otpValue}
        onChange={handleOtpChange}
        numInputs={maxLength}
        renderSeparator={<span className="mx-2" />}
        renderInput={(props) => (
          <input
            {...props}
            type="password"
            maxLength={1}
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" &&
                !otpValue[currentIndex - 1] &&
                currentIndex > 0
              ) {
                handleBackspace();
              }
            }}
            className="!w-[56px] !h-[56px] p-2 focus:bg-[#fcfcfc] bg-[#f3f1f6] rounded-full border focus:border-gray-800 outline-none flex-col justify-center items-center gap-2 inline-flex text-gray-950 text-xl font-normal"
          />
        )}
      />

      {/* Number Keypad */}
      <div className="grid grid-cols-3 gap-x-14 gap-y-8 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number.toString())}
            className="w-14 h-14 rounded-full bg-[#f3f1f6] hover:bg-gray-300 transition-colors flex items-center justify-center text-xl font-semibold"
          >
            {number}
          </button>
        ))}
        <div
          //   onClick={() => handleNumberClick("")}
          className="w-14 h-14 rounded-full  transition-colors flex items-center justify-center text-xl font-semibold "
        ></div>
        <button
          onClick={() => handleNumberClick("0")}
          className="w-14 h-14 rounded-full bg-[#f3f1f6] hover:bg-gray-300 transition-colors flex items-center justify-center text-xl font-semibold "
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="w-14 h-14 rounded-full bg-[#f3f1f6] hover:bg-red-300 transition-colors flex items-center justify-center text-xl"
        >
          <Image
            src="/icons/close-circle.svg"
            width={32}
            height={32}
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
};

export default NumberKeypad;
