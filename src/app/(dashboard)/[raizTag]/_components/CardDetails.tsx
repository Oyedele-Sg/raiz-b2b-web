"use client";
import Overlay from "@/components/ui/Overlay";
import React from "react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { FormikProps } from "formik";
import { formCardValues } from "./CardAmount";
import {
  CardNumberElement as CardNumberElementType,
  CardExpiryElement as CardExpiryElementType,
  CardCvcElement as CardCvcElementType,
} from "@stripe/react-stripe-js";

interface Props {
  handlePay: () => void;
  close: () => void;
  loading: boolean;
  formik: FormikProps<formCardValues>;
  CardNumberElement: typeof CardNumberElementType;
  CardExpiryElement: typeof CardExpiryElementType;
  CardCvcElement: typeof CardCvcElementType;
  disableBtn: boolean;
}
const CardDetails = ({
  close,
  handlePay,
  loading,
  formik,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  disableBtn,
}: Props) => {
  return (
    <Overlay close={close} width="350px" height="400px">
      <div className="space-y-4 w-full mt-4 p-4  rounded-lg">
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
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
          className="p-2 border rounded-md"
        />

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
          className="p-2 border rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700">CVC</label>
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
          className="p-2 border rounded-md"
        />
        <InputField
          placeholder="Enter first name"
          label="First Name"
          {...formik.getFieldProps("firstName")}
          status={
            formik.touched.firstName && formik.errors.firstName ? "error" : null
          }
          errorMessage={formik.touched.firstName && formik.errors.firstName}
        />
        <InputField
          placeholder="Enter last name"
          label="Last Name"
          {...formik.getFieldProps("lastName")}
          status={
            formik.touched.lastName && formik.errors.lastName ? "error" : null
          }
          errorMessage={formik.touched.lastName && formik.errors.lastName}
        />
        <InputField
          placeholder="Enter your email address"
          label="Email"
          type="email"
          {...formik.getFieldProps("email")}
          status={formik.touched.email && formik.errors.email ? "error" : null}
          errorMessage={formik.touched.email && formik.errors.email}
        />
        <Button disabled={disableBtn} loading={loading} onClick={handlePay}>
          Proceed to pay
        </Button>
      </div>
    </Overlay>
  );
};

export default CardDetails;
