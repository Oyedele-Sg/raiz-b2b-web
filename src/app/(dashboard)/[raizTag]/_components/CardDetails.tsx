"use client";
import React from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { FormikProps } from "formik";
import { formCardValues } from "./CardAmount";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import SideModalWrapper from "../../_components/SideModalWrapper";
import InputLabel from "@/components/ui/InputLabel";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  close: () => void;
  loading: boolean;
  formik: FormikProps<formCardValues>;
  disableBtn: boolean;
  goNext: (payment_method_id: string, formValues: formCardValues) => void;
}
const CardDetails = ({ close, loading, formik, disableBtn, goNext }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  // const elementStyles = {
  //   base: {
  //     fontSize: "16px",
  //     color: "#424770",
  //     "::placeholder": { color: "#aab7c4" },
  //   },
  //   invalid: {
  //     color: "#9e2146",
  //   },
  // };

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe or elements not initialized");
      return;
    }

    if (
      !formik.values.firstName ||
      !formik.values.lastName ||
      !formik.values.email
    ) {
      toast.error("Please provide complete billing details");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      toast.error("Card number element not found");
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: {
          name: `${formik.values.firstName} ${formik.values.lastName}`,
          email: formik.values.email,
        },
      });

      if (error) {
        toast.error(error.message || "Failed to create payment method");
        return;
      }

      goNext(paymentMethod!.id, formik.values);
    } catch (err) {
      toast.error("An error occurred while creating payment method");
      console.error(err);
    }
  };
  return (
    <SideModalWrapper close={close}>
      <div className="w-full h-full flex flex-col">
        <button onClick={close}>
          <Image
            src={"/icons/arrow-left.svg"}
            alt="back"
            width={18.48}
            height={18.48}
          />
        </button>
        <div className="flex justify-between mt-4 mb-11">
          <div className="">
            <h5 className="text-raiz-gray-950 text-xl lg:text-[23px] font-semibold leading-10">
              Enter card details
            </h5>
            <p className="text-raiz-gray-700 text-[15px] font-normal leading-snug">
              Send money through a debit card
            </p>
          </div>
          <div className="w-10  h-10">
            <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
              <path
                opacity="0.35"
                d="M30 10.48H20V3.81329H13.3333V10.48H10C7.23833 10.48 5 12.7183 5 15.48V30.48C5 33.2416 7.23833 35.48 10 35.48H30C32.7617 35.48 35 33.2416 35 30.48V15.48C35 12.7183 32.7617 10.48 30 10.48Z"
                fill="#C6ADD5"
              />
              <path
                d="M29.1667 25.48C30.5474 25.48 31.6667 24.3607 31.6667 22.98C31.6667 21.5993 30.5474 20.48 29.1667 20.48C27.786 20.48 26.6667 21.5993 26.6667 22.98C26.6667 24.3607 27.786 25.48 29.1667 25.48Z"
                fill="#493260"
              />
              <path
                d="M10 7.14663V10.48H15V3.81329H13.3333C11.4917 3.81329 10 5.30496 10 7.14663Z"
                fill="#733B9C"
              />
              <path
                d="M18.3333 10.48H26.6666V7.14663C26.6666 5.30496 25.175 3.81329 23.3333 3.81329H18.3333V10.48Z"
                fill="#733B9C"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between items-center">
          <div className="space-y-4 w-full mt-4  rounded-lg">
            <InputField
              placeholder="Enter first name"
              label="First Name"
              {...formik.getFieldProps("firstName")}
              status={
                formik.touched.firstName && formik.errors.firstName
                  ? "error"
                  : null
              }
              errorMessage={formik.touched.firstName && formik.errors.firstName}
            />
            <InputField
              placeholder="Enter last name"
              label="Last Name"
              {...formik.getFieldProps("lastName")}
              status={
                formik.touched.lastName && formik.errors.lastName
                  ? "error"
                  : null
              }
              errorMessage={formik.touched.lastName && formik.errors.lastName}
            />
            <InputField
              placeholder="Enter your email address"
              label="Email"
              type="email"
              {...formik.getFieldProps("email")}
              status={
                formik.touched.email && formik.errors.email ? "error" : null
              }
              errorMessage={formik.touched.email && formik.errors.email}
            />
            <>
              <InputLabel content="Card Number" />
              <CardNumberElement
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
                className="p-[15px] h-[50px] text-sm text-raiz-gray-950  border bg-raiz-gray-100 focus:bg-white focus:border-raiz-gray-600 active:border-raiz-gray-600  outline-none rounded-lg leading-tight placeholder:text-raiz-gray-400 placeholder:text-sm"
              />
            </>
            <div className="flex justify-between gap-4 items-center">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <CardExpiryElement
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
                  className="p-[15px] h-[50px] text-sm text-raiz-gray-950  border bg-raiz-gray-100 focus:bg-white focus:border-raiz-gray-600 active:border-raiz-gray-600  outline-none rounded-lg leading-tight placeholder:text-raiz-gray-400 placeholder:text-sm"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <CardCvcElement
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
                  className="p-[15px] h-[50px] text-sm text-raiz-gray-950  border bg-raiz-gray-100 focus:bg-white focus:border-raiz-gray-600 active:border-raiz-gray-600  outline-none rounded-lg leading-tight placeholder:text-raiz-gray-400 placeholder:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={disableBtn}
            >
              Proceed to pay
            </Button>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </SideModalWrapper>
  );
};

export default CardDetails;
