"use client";
import React, { useRef, useState } from "react";
// import SideModalWrapper from "../../../SideModalWrapper";
import SideWrapperHeader from "@/components/SideWrapperHeader";
import z from "zod";
import { useTopupStore } from "@/store/TopUp";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import Button from "@/components/ui/Button";

interface Props {
  close: () => void;
  goNext: () => void;
}

const TopupAmount = ({ close, goNext }: Props) => {
  const { amount, actions } = useTopupStore();
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [rawAmount, setRawAmount] = useState(amount);
  const { selectedCurrency } = useCurrencyStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const amountSchema = z
    .string()
    .regex(/^\d*\.?\d{0,2}$/, "Enter a valid amount (max 2 decimal places)")
    .refine((val) => parseFloat(val) >= 1, {
      message: "Amount must be at least 1",
    });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");
    if (value.startsWith(".")) value = "0" + value;

    const decimalCount = value.split(".").length - 1;
    if (decimalCount > 1) return;

    const [integerPart, decimalPart] = value.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const formattedValue =
      decimalPart !== undefined
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;

    setRawAmount(formattedValue);
    actions.setAmount(value);

    const result = amountSchema.safeParse(value);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }
  };
  const displayValue = () => {
    if (isFocused || !amount)
      return amount ? `${selectedCurrency.sign}${rawAmount}` : "";
    const num = parseFloat(rawAmount);
    return isNaN(num) ? "" : `${selectedCurrency.sign}${num.toFixed(2)}`;
  };

  const handleNext = () => {
    goNext();
    // close();
  };
  return (
    <>
      <SideWrapperHeader
        close={close}
        title="Top Up"
        titleColor="text-zinc-900"
      />
      <div className="flex flex-col h-full justify-between items-center w-full">
        <div className="flex flex-col justify-center items-center">
          <p className="text-center mt-10 justify-start text-zinc-900 text-base mb-3">
            How much do you want to top up?
          </p>
          <div className="flex items-center">
            <input
              ref={inputRef}
              autoFocus
              className="outline-none h-[91px] bg-transparent w-fit xl:mx-auto text-center text-zinc-900 placeholder:text-zinc-900 text-3xl font-semibold leading-10"
              placeholder={`${selectedCurrency.sign}0.00`}
              value={displayValue()}
              onChange={handleAmountChange}
              onFocus={() => setIsFocused(true)}
            />
          </div>
        </div>
        <div className="w-full py-6">
          <div className=" p-3.5 mb-3 bg-gray-100 w-full rounded-lg outline outline-1 outline-offset-[-1px] outline-white inline-flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-700 text-xs font-normal font-brSonoma leading-normal">
                You get:
              </span>
              <div className="h-0.5 w-[50%] px-4 bg-white"></div>
              <span className="text-zinc-900  text-xs font-semibold leading-none">
                {selectedCurrency?.sign}
                {parseFloat(amount || "0").toFixed(2)}
              </span>
            </div>
          </div>
          <Button
            disabled={!!error || !amount}
            // loading={loading}
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default TopupAmount;
