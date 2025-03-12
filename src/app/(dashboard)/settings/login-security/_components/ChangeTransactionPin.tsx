"use client";
import React, { useState } from "react";
import { PartChildProps } from "../../help&support/_components/HelpSupportNav";
import TrxnOtpForm from "./TrxnOtpForm";
import EnterNewPinForm from "./EnterNewPinForm";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  generalOTPFormSchema,
  pinSchema,
} from "@/app/(auth)/register/_components/validation";
import { useMutation } from "@tanstack/react-query";
import { IResetPinPayload } from "@/types/services";
import { ResetTransactionPinApi } from "@/services/auth";
import { toast } from "sonner";

const ChangeTransactionPin = ({ setPart }: PartChildProps) => {
  const [step, setStep] = useState(1);
  const ChangePinMutation = useMutation({
    mutationFn: (data: IResetPinPayload) => ResetTransactionPinApi(data),
    onSuccess: (response) => {
      toast.success(response?.message);
      setPart(0);
    },
  });
  const otpFormik = useFormik({
    initialValues: { otp: "" },
    validationSchema: toFormikValidationSchema(generalOTPFormSchema),
    onSubmit: () => {
      setStep(2);
    },
  });
  const pinFormik = useFormik({
    initialValues: { pin: "", confirmPin: "" },
    validationSchema: toFormikValidationSchema(pinSchema),
    onSubmit: (values) => {
      ChangePinMutation.mutate({
        password: values.pin,
        otp: otpFormik.values.otp,
      });
    },
  });

  const displayStep = () => {
    switch (step) {
      case 1:
        return <TrxnOtpForm setPart={setPart} formik={otpFormik} />;
      case 2:
        return (
          <EnterNewPinForm
            setStep={setStep}
            formik={pinFormik}
            loading={ChangePinMutation.isPending}
          />
        );
      default:
        break;
    }
  };

  return <div className="h-full flex flex-col">{displayStep()}</div>;
};

export default ChangeTransactionPin;
