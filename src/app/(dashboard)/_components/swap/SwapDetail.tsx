import SideWrapperHeader from "@/components/SideWrapperHeader";
import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";
import { useUser } from "@/lib/hooks/useUser";
import { useSwapStore } from "@/store/Swap";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import React, { useState } from "react";
import { z } from "zod";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SelectCurrencyModal from "./SelectCurrencyModal";
import { getCurrencySymbol } from "@/utils/helpers";
import ErrorMessage from "@/components/ui/ErrorMessage";

interface Props {
  close: () => void;
  goNext: () => void;
  exchangeRate: number | undefined;
  recipientAmount: string;
  timeLeft: number;
  loading: boolean;
}

const SwapDetail = ({
  close,
  goNext,
  exchangeRate,
  recipientAmount,
  timeLeft,
  loading,
}: Props) => {
  const { user } = useUser();
  const currentWallet = useCurrentWallet(user);
  const { selectedCurrency } = useCurrencyStore();
  const [error, setError] = useState<string | null>(null);
  const { amount, actions, swapFromCurrency, swapToCurrency, swapFromWallet } =
    useSwapStore();
  const [showCurrency, setShowCurrency] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const amountSchema = z
    .string()
    .regex(/^\d*\.?\d{0,2}$/, "Enter a valid amount (max 2 decimal places)")
    .refine((val) => parseFloat(val) >= 1, {
      message: "Amount must be at least 1",
    })
    .refine(
      (val) => {
        const totalAvailable = currentWallet?.account_balance || 0;
        return parseFloat(val) <= totalAvailable;
      },
      {
        message: `Amount cannot exceed available balance`,
      }
    );

  // console.log("ccxx", swapFromWallet);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }
    if (parts[1] && parts[1].length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }
    if (value.startsWith(".")) value = "0" + value;
    if (value === "") value = "";

    actions.setAmount(value);
    const result = amountSchema.safeParse(value || "0");
    setError(result.success ? null : result.error.errors[0].message);
  };

  const displayValue = () => {
    if (isFocused || !amount)
      return amount ? `${getCurrencySymbol(swapFromCurrency)}${amount}` : "";
    const num = parseFloat(amount);
    return isNaN(num)
      ? ""
      : `${getCurrencySymbol(swapFromCurrency)}${num.toFixed(2)}`;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };
  return (
    <div>
      <SideWrapperHeader
        title={`Swap ${swapFromCurrency}`}
        close={close}
        titleColor="text-zinc-900"
      />
      <div className="flex flex-col justify-between h-[85vh] ">
        <div className="mt-5 ">
          <h6 className="text-center justify-start text-zinc-900 text-base font-normal  leading-normal">
            How much do you want to swap?
          </h6>
          <div className="flex flex-col  items-center">
            <input
              autoFocus
              className="outline-none h-[91px] bg-transparent w-fit xl:mx-auto text-center text-zinc-900 placeholder:text-zinc-900 text-3xl font-semibold leading-10"
              placeholder="0.00"
              value={displayValue()}
              onChange={handleAmountChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {error && <ErrorMessage message={error} />}
          </div>
          <div className="px-4 py-2 mx-auto bg-indigo-100 bg-opacity-60 rounded-2xl flex w-fit flex-col justify-center items-center gap-2">
            <p className="text-zinc-900 text-xs font-normal leading-tight">
              Balance:
              <span className="text-zinc-900 text-xs font-bold leading-tight">
                {getCurrencySymbol(selectedCurrency?.sign)}
                {currentWallet?.account_balance}{" "}
              </span>
              <span>({selectedCurrency.name})</span>
            </p>
          </div>
        </div>
        <div className="pb-5">
          <p className="text-zinc-900 text-sm font-medium mb-3 font-brSonoma leading-normal">
            Swap currency
          </p>
          <div className="flex justify-between items-center p-3.5 bg-gray-100 rounded-xl">
            <div className="flex gap-1 items-center">
              <Image src={"/icons/ngn.svg"} width={24} height={14} alt="" />
              <span className="text-zinc-900 text-sm font-normal leading-tight">
                {swapFromWallet?.wallet_type?.wallet_type_name}
              </span>
            </div>
            <button
              onClick={() => setShowCurrency(true)}
              className="px-1.5 py-1 bg-zinc-200 rounded-lg text-zinc-700 text-xs font-medium font-brSonoma leading-tight"
            >
              Change
            </button>
          </div>
          <div className="mt-11  p-3.5 mb-3 bg-gray-100 w-full rounded-lg outline outline-1 outline-offset-[-1px] outline-white inline-flex flex-col justify-center items-start gap-2">
            {/* Recipient gets */}
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-700 text-xs font-normal font-brSonoma leading-normal">
                Recipient gets:
              </span>
              <div className="h-0.5 w-[50%] px-4 bg-white"></div>
              <span className="text-zinc-900  text-xs font-semibold leading-none">
                {recipientAmount
                  ? `${getCurrencySymbol(swapToCurrency)}${recipientAmount}`
                  : "Calculating..."}
              </span>
            </div>

            {/* Rate */}
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-700 text-xs font-normal font-brSonoma leading-normal">
                {getCurrencySymbol(swapFromCurrency)}1({swapFromCurrency})
              </span>
              <div className="h-0.5 w-[75%] px-4 bg-white"></div>
              <span className="text-zinc-900  text-xs font-semibold leading-none">
                {getCurrencySymbol(swapToCurrency)}
                {exchangeRate?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
          <div className="p-5 mb-3 bg-indigo-100 bg-opacity-60 rounded-[20px] inline-flex justify-start items-start gap-2 w-full">
            <Image
              src={"/icons/timer.svg"}
              width={20}
              height={20}
              alt="timer"
            />
            <p className="text-zinc-900 text-xs leading-tight">
              Confirm swap in the next{" "}
              <span className=" font-semibold"> {formatTime(timeLeft)}</span>
            </p>
          </div>
          <Button disabled={loading || !!error} onClick={goNext}>
            {loading ? "Fetching rates..." : "Continue"}
          </Button>
        </div>
      </div>
      {showCurrency && (
        <SelectCurrencyModal close={() => setShowCurrency(false)} />
      )}
    </div>
  );
};

export default SwapDetail;
