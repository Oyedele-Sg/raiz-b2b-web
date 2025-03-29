import React from "react";
import { bankTypeProp } from "./ToUsdBanks";
import USBankBeneficiary from "./USBankBeneficiary";

interface Props {
  type: bankTypeProp;
  close: () => void;
}

const AddBeneficiary = ({ type, close }: Props) => {
  const displayForm = () => {
    switch (type) {
      case "us":
        return <USBankBeneficiary close={close} />;
        break;

      default:
        break;
    }
  };
  return <>{displayForm()}</>;
};

export default AddBeneficiary;
