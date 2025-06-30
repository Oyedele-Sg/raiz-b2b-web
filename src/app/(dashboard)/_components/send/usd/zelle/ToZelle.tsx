"use client";
import React, { useState } from "react";
import { ToUsdBanksStepsType } from "../bankTransfer/toBanks/ToUsdBanks";
// import AddCardBeneficiary from "../debitCard/AddCardBeneficiary";
// import AddZelleBeneficiary from "./AddZelleBeneficiary";

// interface Props {
//   close: () => void;
// }

const ToZelle = () => {
  const [step, setStep] = useState<ToUsdBanksStepsType>("add-beneficiary");
  console.log(setStep);
  const displayScreen = () => {
    switch (step) {
      case "add-beneficiary":
        return null;
      // return <AddZelleBeneficiary close={close} />;
      default:
        break;
    }
  };
  return <>{displayScreen()}</>;
};

export default ToZelle;
