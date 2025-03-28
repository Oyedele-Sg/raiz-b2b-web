import React, { useState } from "react";
import BankTypeModal from "./BankTypeModal";

type ToUsdBanksStepsType = "type" | "add-beneficiary";

interface Props {
  close: () => void;
}

const ToUsdBanks = ({ close }: Props) => {
  const [step, setStep] = useState<ToUsdBanksStepsType>("type");
  const [bankType, setBankType] = useState<"us" | "int">();

  const displayStep = () => {
    switch (step) {
      case "type":
        return (
          <BankTypeModal
            close={close}
            bankType={bankType}
            setBankType={setBankType}
          />
        );
      // case "add-beneficiary":
      //     return (

      //     )
      default:
        break;
    }
  };

  return <div>{displayStep()}</div>;
};

export default ToUsdBanks;
