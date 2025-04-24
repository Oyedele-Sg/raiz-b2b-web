"use client";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { useSendStore } from "@/store/Send";
import { IBusinessPaymentData } from "@/types/services";
import React, { useRef, useState } from "react";
import { z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PublicAxios } from "@/lib/publicAxios";
import CardDetails from "./CardDetails";
import { useFormik } from "formik";
import { toast } from "sonner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY || ""
);

interface Props {
  goNext: () => void;
  data: IBusinessPaymentData;
}

export type formCardValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const CardAmount = ({ data, goNext }: Props) => {
  const { amount, actions, purpose } = useSendStore();
  const [rawAmount, setRawAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [fee, setFee] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const stripe = useStripe();
  const elements = useElements();

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
    actions.setAmountAndRemark({ amount: value, purpose });

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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => console.log("values", values),
  });

  const handlePayment = async () => {
    console.log("Stripe or Elements not ready", { stripe, elements, amount });
    if (!stripe || !elements || !amount) return;

    setLoading(true);
    setPaymentError(null);

    try {
      // Convert amount to cents (assuming amount is in dollars)
      const amountInCents = Math.round(parseFloat(amount) * 100);
      const res = await PublicAxios.post(
        `/admin/transaction/topup/usd/create-intent/?name=${data?.account_user?.username}&email=${data?.email}&entity_id=${data?.account_user?.entity_id}`,
        {
          transaction_amount: amountInCents,
          curreny: "USD",
        }
      );
      const { client_secret, payment_intent_id, fee } = await res.data;
      setFee(fee);

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) {
        setPaymentError("Card number element not found.");
        console.log("Card number element not found");
        setLoading(false);
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: `${formik.values.firstName} ${formik.values.lastName}`,
            email: formik.values.email,
          },
        },
      });

      if (result.error) {
        console.error("Payment error:", result.error);
        toast.error(result.error.message || "An error occurred");
        setPaymentError(result?.error?.message || "An error occurred");
        setLoading(false);
        return;
      }

      if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        const params = {
          entity_id: data?.account_user?.entity_id,
          payer_first_name: formik.values.firstName,
          payer_last_name: formik.values.lastName,
          payer_email: formik.values.email,
          payment_description: "",
        };
        const res = await PublicAxios.post(
          "/admin/transaction/topup/usd/confirm-intent/",
          {
            payment_intent: payment_intent_id,
            currency: "USD",
          },
          {
            params,
          }
        );
        actions.setTransactionDetail(res?.data);
        goNext();
      }
    } catch (err) {
      setPaymentError("An error occurred during payment processing.");
      console.log(err);
    } finally {
      setLoading(false);
    }
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
              />
            </div>
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
        <div className="w-full ">
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
          handlePay={handlePayment}
          loading={loading}
          formik={formik}
          CardCvcElement={CardCvcElement}
          CardExpiryElement={CardExpiryElement}
          CardNumberElement={CardNumberElement}
          disableBtn={!!error || !amount || !stripe || loading}
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
