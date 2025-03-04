"use client";
import React, { useState } from "react";
import { PartChildProps } from "../../help&support/_components/HelpSupportNav";
import TrxnOtpForm from "./TrxnOtpForm";
import EnterNewPinForm from "./EnterNewPinForm";

const ChangeTransactionPin = ({ setPart }: PartChildProps) => {
  const [step, setStep] = useState(1);

  const displayStep = () => {
    switch (step) {
      case 1:
        return <TrxnOtpForm setPart={setPart} setStep={setStep} />;
      case 2:
        return <EnterNewPinForm setStep={setStep} />;
      default:
        break;
    }
  };

  return <div className="h-full flex flex-col">{displayStep()}</div>;
};

export default ChangeTransactionPin;
