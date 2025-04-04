"use client";
import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";
import { useUser } from "@/lib/hooks/useUser";
import { useSendStore } from "@/store/Send";
import React, { useRef, useState } from "react";
import { z } from "zod";
import SideWrapperHeader from "../SideWrapperHeader";
import Avatar from "../ui/Avatar";
import { getCurrencySymbol } from "@/utils/helpers";
import Image from "next/image";
import ErrorMessage from "../ui/ErrorMessage";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

interface Props {
  goBack: () => void;
  goNext: () => void;
  fee: number;
  loading?: boolean;
}

const InternationalSendMoney = ({
  goBack,
  goNext,
  fee,
  loading = false,
}: Props) => {
  const {
    intBeneficiary,
    amount,
    purpose,
    actions,
    currency: senderCurrency,
  } = useSendStore();
  const { user } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentWallet = useCurrentWallet(user);
  const currency =
    intBeneficiary?.foreign_payout_beneficiary?.beneficiary_currency || "";
  const selectedUser = intBeneficiary?.foreign_payout_beneficiary;
  const amountSchema = z
    .string()
    .regex(/^\d*\.?\d{0,2}$/, "Enter a valid amount (max 2 decimal places)")
    .refine((val) => parseFloat(val) >= 1, {
      message: "Amount must be at least 1",
    });

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
    actions.setAmountAndRemark({ amount: value, purpose });
    const result = amountSchema.safeParse(value || "0");
    setError(result.success ? null : result.error.errors[0].message);
  };
  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.setAmountAndRemark({ amount, purpose: e.target.value });
  };
  const displayValue = () => {
    if (isFocused || !amount)
      return amount ? `${getCurrencySymbol(currency)}${amount}` : "";
    const num = parseFloat(amount);
    return isNaN(num) ? "" : `${getCurrencySymbol(currency)}${num.toFixed(2)}`;
  };
  const handleNext = () => {
    // if (
    //   parseFloat(amount || "0") + fee >
    //   (currentWallet?.account_balance || 0)
    // ) {
    //   toast.warning("Account balance too low to carry out this transaction");
    // } else {
    goNext();
    // }
  };
  return (
    <div className="w-full">
      <SideWrapperHeader
        close={goBack}
        title="Send Money"
        titleColor="text-zinc-900"
      />
      <div className="flex flex-col h-[85vh] justify-between items-center w-full">
        <div className="w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-10 h-10">
              <Avatar src={""} name={selectedUser?.beneficiary_name || ""} />
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                className="absolute bottom-[-11px] right-[-15px]"
              >
                <rect
                  x="1"
                  y="1"
                  width="20"
                  height="20"
                  rx="10"
                  fill="#EAECFF"
                />
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
              {selectedUser?.beneficiary_name}
            </p>
            <p className="text-center mt-10 justify-start text-zinc-900 text-base mb-3">
              How much do you want to send?
            </p>
            <div className="flex items-center">
              <input
                ref={inputRef}
                autoFocus
                className="outline-none h-[91px] bg-transparent w-fit xl:mx-auto text-center text-zinc-900 placeholder:text-zinc-900 text-3xl font-semibold leading-10"
                placeholder="0.00"
                value={displayValue()}
                onChange={handleAmountChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            <div className="px-4 py-2 bg-indigo-100 bg-opacity-60 rounded-2xl inline-flex flex-col justify-center items-center gap-2">
              <p className="text-zinc-900 text-xs font-normal leading-tight">
                Balance:
                <span className="text-zinc-900 text-xs font-bold leading-tight">
                  {getCurrencySymbol(
                    currentWallet?.wallet_type?.currency || ""
                  )}
                  {currentWallet?.account_balance}{" "}
                </span>
                <span>({currency})</span>
              </p>
            </div>
            <div className="w-full mt-10">
              <div className="flex items-center justify-between  font-brSonoma font-medium mb-3 w-full">
                <p className="text-zinc-900 text-sm leading-normal">Purpose</p>
                <div className="flex gap-1 items-center">
                  <Image
                    src={
                      currency === "USD"
                        ? "/icons/dollar.svg"
                        : "/icons/ngn.svg"
                    }
                    alt="currency"
                    width={16}
                    height={16}
                  />
                  <span className="text-zinc-700 text-xs leading-tight">
                    {currency}
                  </span>
                </div>
              </div>
              <InputField
                name="purpose"
                placeholder="What is the purpose?"
                value={purpose || ""}
                onChange={handlePurposeChange}
              />
              {error && <ErrorMessage message={error} />}
            </div>
          </div>
        </div>
        <div className="w-full ">
          <div className=" p-3.5 mb-3 bg-gray-100 w-full rounded-lg outline outline-1 outline-offset-[-1px] outline-white inline-flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-700 text-xs font-normal font-brSonoma leading-normal">
                Recipient gets:
              </span>
              <div className="h-0.5 w-[50%] px-4 bg-white"></div>
              <span className="text-zinc-900  text-xs font-semibold leading-none">
                {getCurrencySymbol(currency)}
                {parseFloat(amount || "0").toFixed(2)}
              </span>
            </div>
            {fee ? (
              <div className="w-full flex justify-between items-center">
                <span className="text-cyan-700 text-xs font-normal font-brSonoma leading-normal">
                  Fee:
                </span>
                <div className="h-0.5 w-[75%] px-4 bg-white"></div>
                <span className="text-zinc-900  text-xs font-semibold leading-none">
                  {getCurrencySymbol(senderCurrency || "")}
                  {fee?.toFixed(2) || "0.00"}
                </span>
              </div>
            ) : null}
          </div>

          <Button
            disabled={!!error || !purpose}
            loading={loading}
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InternationalSendMoney;
