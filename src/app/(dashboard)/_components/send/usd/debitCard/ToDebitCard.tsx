"use client";
import React, { useState } from "react";
import { ToUsdBanksStepsType } from "../bankTransfer/toBanks/ToUsdBanks";
import AddCardBeneficiary from "./AddCardBeneficiary";

interface Props {
  close: () => void;
}
const ToDebitCard = ({ close }: Props) => {
  const [step, setStep] = useState<ToUsdBanksStepsType>("add-beneficiary");
  const [paymentError, setPaymentError] = useState("");
  const displayScreen = () => {
    switch (step) {
      case "add-beneficiary":
        return <AddCardBeneficiary close={close} />;
        break;

      default:
        break;
    }
  };
  return <div>{displayScreen()}</div>;
};

export default ToDebitCard;
