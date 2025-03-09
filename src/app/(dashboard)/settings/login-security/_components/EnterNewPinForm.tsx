"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { pinSchema } from "@/app/(auth)/register/_components/validation";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/Button";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const EnterNewPinForm = ({ setStep }: Props) => {
  const [formState, setFormState] = useState<"pin" | "confirmPin">("pin");
  const formik = useFormik({
    initialValues: { pin: "", confirmPin: "" },
    validationSchema: toFormikValidationSchema(pinSchema),
    onSubmit: (values) => {
      console.log("PIN successfully set:", values.pin);
    },
  });
  const handleSubmitButton = async () => {
    // Mark the field as touched before proceeding
    if (formState === "pin") {
      formik.setTouched({ pin: true });
      await formik.validateForm();
      if (!formik.errors.pin) {
        setFormState("confirmPin");
      }
    } else {
      formik.setTouched({ confirmPin: true });
      formik.handleSubmit();
    }
  };

  const handleBackButton = () => {
    if (formState === "pin") {
      setStep(1);
    } else {
      setFormState("pin");
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <button onClick={handleBackButton}>
          <Image
            src="/icons/arrow-left.svg"
            alt="arrow-left"
            width={18}
            height={18}
          />
        </button>
        <span className="text-raiz-gray-950 font-bold leading-tight">
          Change Transaction PIN
        </span>
        <div />
      </div>
      <p className="text-raiz-gray-950 text-sm font-medium font-brSonoma leading-normal mb-3 mt-5">
        {`${formState === "pin" ? "Enter" : "Confirm"} New PIN`}
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col h-full justify-between  lg:h-[65%] xl:h-[80%]"
      >
        {formState === "pin" ? (
          <OtpInput
            value={formik.values.pin}
            onChange={(val) => formik.setFieldValue("pin", val)}
            error={formik.errors.pin}
            touched={formik.touched.pin}
          />
        ) : (
          <OtpInput
            value={formik.values.confirmPin}
            onChange={(val) => formik.setFieldValue("confirmPin", val)}
            error={formik.errors.confirmPin}
            touched={formik.touched.confirmPin}
          />
        )}
        <Button
          disabled={
            formState === "pin"
              ? !formik.values.pin || formik.values.pin.length < 4
              : !formik.values.confirmPin || formik.values.confirmPin.length < 4
          }
          onClick={handleSubmitButton}
        >
          {formState === "pin" ? "Continue" : "Submit Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EnterNewPinForm;
