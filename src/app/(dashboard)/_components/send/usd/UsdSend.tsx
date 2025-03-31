import React from "react";
import SendOptions from "./SendOptions";
import ToRaizers from "./toRaizers/ToRaizers";
import { useSendStore } from "@/store/Send";
import BankTransfer from "./bankTransfer/BankTransfer";
import ToDebitCard from "./debitCard/ToDebitCard";

interface Props {
  close: () => void;
}

const UsdSend = ({ close }: Props) => {
  const { usdSendType, actions } = useSendStore();

  const displayStep = () => {
    switch (usdSendType) {
      case null:
        return <SendOptions close={close} />;
      case "to Raizer":
        return <ToRaizers close={close} />;
      case "bank transfer":
        return <BankTransfer close={() => actions.selectUSDSendOption(null)} />;
      case "to debit card":
        return <ToDebitCard close={() => actions.selectUSDSendOption(null)} />;
      default:
        break;
    }
  };
  return <div className="">{displayStep()}</div>;
};

export default UsdSend;
