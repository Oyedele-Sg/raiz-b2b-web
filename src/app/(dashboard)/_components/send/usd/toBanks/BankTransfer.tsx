"use client";
import React, { useState } from "react";
import ToUsdBanks from "./ToUsdBanks";
import ToInternational from "../toInternaional/ToInternational";
import SendOptions from "../SendOptions";
import BankTypeModal from "./BankTypeModal";

export type bankTypeProp = "us" | "int" | "global";

interface Props {
  close: () => void;
}

const BankTransfer = ({ close }: Props) => {
  const [bankType, setBankType] = useState<bankTypeProp | undefined>();

  const displayScreen = () => {
    switch (bankType) {
      case undefined:
        return (
          <>
            <SendOptions close={close} />
            <BankTypeModal
              close={close}
              bankType={bankType}
              setBankType={setBankType}
            />
          </>
        );
      case "us":
        return (
          bankType && (
            <ToUsdBanks
              close={close}
              bankType={bankType}
              setBankType={setBankType}
            />
          )
        );
      case "int":
        return (
          <ToInternational
            close={close}
            bankType={bankType}
            setBankType={setBankType}
          />
        );
      default:
        break;
    }
  };
  return <div>{displayScreen()}</div>;
};

export default BankTransfer;
