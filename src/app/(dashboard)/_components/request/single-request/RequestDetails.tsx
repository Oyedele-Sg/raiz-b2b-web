"use client";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { ISearchedUser } from "@/types/user";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { z } from "zod";

interface Props {
  goBack: () => void;
  goNext: () => void;
  selectedUser: ISearchedUser | undefined;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  narration: string;
  setNarration: Dispatch<SetStateAction<string>>;
}

const amountSchema = z
  .string()
  .regex(/^\d*\.?\d*$/, "Enter a valid amount")
  .refine((val) => parseFloat(val) > 0, {
    message: "Amount must be greater than zero",
  });

const RequestDetails = ({
  goBack,
  goNext,
  selectedUser,
  amount,
  setAmount,
  narration,
  setNarration,
}: Props) => {
  const { selectedCurrency } = useCurrencyStore();
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters except "."
    if (value.startsWith(".")) value = "0" + value; // Prepend 0 if starts with "."

    // Prevent multiple decimal points
    const decimalCount = value.split(".").length - 1;
    if (decimalCount > 1) return;

    setAmount(value);

    const result = amountSchema.safeParse(value);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }
  };

  // Format the amount to 2 decimal places on blur
  const handleBlur = () => {
    setIsFocused(false);
    if (amount) {
      const num = parseFloat(amount);
      if (!isNaN(num)) {
        setAmount(String(num));
      }
    }
  };

  // Display value: show raw input while typing, formatted value when not focused
  const displayValue = () => {
    if (isFocused || !amount)
      return amount ? `${selectedCurrency.sign}${amount}` : "";
    const num = parseFloat(amount);
    return isNaN(num) ? "" : `${selectedCurrency.sign}${num.toFixed(2)}`;
  };

  return (
    <div>
      <SideWrapperHeader
        close={goBack}
        title="Request Money"
        titleColor="text-zinc-900"
      />
      <div className="flex flex-col h-[80vh] justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-10 h-10">
            <Image
              src={selectedUser?.selfie_image || "/images/default-pfp.svg"}
              alt={selectedUser?.account_name || ""}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="absolute bottom-[-5px] right-[-6px]"
            >
              <rect x="1" y="1" width="20" height="20" rx="10" fill="#EAECFF" />
              <rect
                x="1"
                y="1"
                width="20"
                height="20"
                rx="10"
                stroke="#E4E0EA"
                strokeWidth="0.5"
              />
              <path
                d="M13.7598 5.97312L7.73977 7.97312C3.69311 9.32645 3.69311 11.5331 7.73977 12.8798L9.52644 13.4731L10.1198 15.2598C11.4664 19.3065 13.6798 19.3065 15.0264 15.2598L17.0331 9.24645C17.9264 6.54645 16.4598 5.07312 13.7598 5.97312ZM13.9731 9.55978L11.4398 12.1065C11.3398 12.2065 11.2131 12.2531 11.0864 12.2531C10.9598 12.2531 10.8331 12.2065 10.7331 12.1065C10.5398 11.9131 10.5398 11.5931 10.7331 11.3998L13.2664 8.85312C13.4598 8.65978 13.7798 8.65978 13.9731 8.85312C14.1664 9.04645 14.1664 9.36645 13.9731 9.55978Z"
                fill="#4B0082"
              />
            </svg>
          </div>
          <p className="text-center mt-4 justify-start text-zinc-900 text-sm font-bold  leading-none">
            {selectedUser?.account_name}
          </p>
          <p className="text-center justify-start text-zinc-900 text-base mb-3 mt-5">
            How much do you want to send?
          </p>
          <input
            ref={inputRef}
            autoFocus
            className="outline-none h-[91px] bg-transparent w-fit mx-auto text-center text-zinc-900 placeholder:text-zinc-900 text-3xl font-semibold leading-10"
            placeholder={`${selectedCurrency.sign}0.00`}
            value={displayValue()}
            onChange={handleAmountChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
          />
          {error && <ErrorMessage message={error} />}
          <input
            className="outline-none h-7 bg-transparent w-fit mx-auto text-center text-zinc-900 placeholder:text-zinc-700 text-base font-normal  leading-normal"
            placeholder={`What is the purpose?`}
            value={narration}
            onChange={(e) => setNarration(e.target.value)}
          />
        </div>
        <Button onClick={goNext} disabled={!amount || error !== null}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RequestDetails;
