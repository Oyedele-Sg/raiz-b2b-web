"use client";
import React, { useState } from "react";
import { ToUsdBanksStepsType } from "../bankTransfer/toBanks/ToUsdBanks";
import AddCardBeneficiary from "./AddCardBeneficiary";

interface Props {
  close: () => void;
}
const ToDebitCard = ({ close }: Props) => {
  const [step, setStep] = useState<ToUsdBanksStepsType>("add-beneficiary");
  // const [paymentError, setPaymentError] = useState("");
  console.log(setStep);
  const displayScreen = () => {
    switch (step) {
      case "add-beneficiary":
        return <AddCardBeneficiary close={close} />;
      default:
        break;
    }
  };
  return <>{displayScreen()}</>;
};

export default ToDebitCard;
