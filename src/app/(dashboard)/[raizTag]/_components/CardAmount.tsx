"use client";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useSendStore } from "@/store/Send";
import { IBusinessPaymentData } from "@/types/services";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import CardDetails from "./CardDetails";
import InputField from "@/components/ui/InputField";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FormikProps } from "formik";
import { useGuestSendStore } from "@/store/GuestSend";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY || ""
);

interface Props {
  goNext: (payment_method_id: string, formValues: formCardValues) => void;
  data: IBusinessPaymentData;
  fee: number | null;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  amountFromLink?: string;
}

export type formCardValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const CardAmount = ({
  data,
  fee,
  loading,
  goNext,
  formik,
  amountFromLink,
}: Props) => {
  const { actions, purpose } = useSendStore();
  const { amount, actions: guestActions } = useGuestSendStore();
  const [rawAmount, setRawAmount] = useState(amount);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const stripe = useStripe();

  const amountSchema = z
    .string()
    .regex(/^\d*\.?\d{0,2}$/, "Enter a valid amount (max 2 decimal places)")
    .refine((val) => parseFloat(val) >= 1, {
      message: "Amount must be at least 1",
    });
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric except "."
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
    guestActions.setField("amount", value);

    const result = amountSchema.safeParse(value);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }
  };
  const displayValue = () => {
    if (isFocused || !amount) return amount ? `$${rawAmount}` : "";
    const num = parseFloat(rawAmount);
    return isNaN(num) ? "" : `$${num.toFixed(2)}`;
  };

  const purposeSchema = z
    .string()
    .min(3, { message: "Purpose must be at least 3 characters long" });

  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPurpose = e.target.value;
    actions.setAmountAndRemark({ amount, purpose: newPurpose });

    // Re-validate purpose
    const result = purposeSchema.safeParse(newPurpose);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    // Also validate amount again to clear error if both are valid
    const amountResult = amountSchema.safeParse(amount || "0");
    if (!amountResult.success) {
      setError(amountResult.error.errors[0].message);
      return;
    }

    setError(null);
  };

  return (
    <div
      className="w-full flex flex-col h-full mt-11
    "
    >
      <div className="flex flex-col h-full justify-between items-center w-full">
        <div className="w-full h-full">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-10 h-10">
              <Avatar
                src={data?.account_user?.selfie_image}
                name={data?.account_user?.username}
              />
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
            <p className="text-center mt-4 justify-start text-zinc-900 text-sm font-bold  leading-none capitalize">
              {data?.account_user?.username}
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
                disabled={!!amountFromLink}
              />
            </div>
            <div className="w-full my-10">
              <div className="flex items-center justify-between  font-brSonoma font-medium mb-3 w-full">
                <p className="text-zinc-900 text-sm leading-normal">Purpose</p>
                <div className="flex gap-1 items-center">
                  <Image
                    src={"/icons/dollar.svg"}
                    alt="currency"
                    width={16}
                    height={16}
                  />
                  <span className="text-zinc-700 text-xs leading-tight">
                    USD
                  </span>
                </div>
              </div>
              <InputField
                name="purpose"
                placeholder="What is the purpose?"
                value={purpose || ""}
                onChange={handlePurposeChange}
              />
            </div>
            {error && <ErrorMessage message={error} />}
            {/* <div className="w-full mt-4 p-4 border rounded-lg">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div> */}
          </div>
        </div>
        <div className="w-full pb-5">
          <div className=" p-3.5 mb-3 bg-gray-100 w-full rounded-lg outline outline-1 outline-offset-[-1px] outline-white inline-flex flex-col justify-center items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-700 text-xs font-normal font-brSonoma leading-normal">
                Recipient gets:
              </span>
              <div className="h-0.5 w-[50%] px-4 bg-white"></div>
              <span className="text-zinc-900  text-xs font-semibold leading-none">
                ${parseFloat(amount || "0").toFixed(2)}
              </span>
            </div>
            <div className="w-full flex justify-between items-center">
              <span className="text-cyan-700 text-xs font-normal font-brSonoma leading-normal">
                Fee:
              </span>
              <div className="h-0.5 w-[75%] px-4 bg-white"></div>
              {fee ? (
                <span className="text-zinc-900  text-xs font-semibold leading-none">
                  ${(fee / 100)?.toFixed(2) || "0.00"}
                </span>
              ) : (
                "..."
              )}
            </div>
          </div>
          <Button
            disabled={!!error || !amount || !stripe || loading}
            loading={loading}
            onClick={() => setShowPayModal(true)}
          >
            Continue
          </Button>
        </div>
      </div>

      {showPayModal && (
        <CardDetails
          close={() => setShowPayModal(false)}
          loading={loading}
          formik={formik}
          disableBtn={!!error || !amount || !stripe || loading}
          goNext={goNext}
        />
      )}
    </div>
  );
};

const CardAmountWithStripe = (props: Props) => (
  <Elements stripe={stripePromise}>
    <CardAmount {...props} />
  </Elements>
);

export default CardAmountWithStripe;
