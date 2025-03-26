import React from "react";
import SendOptions from "./SendOptions";
import ToRaizers from "./toRaizers/ToRaizers";
import { useSendStore } from "@/store/Send";

interface Props {
  close: () => void;
}

const UsdSend = ({ close }: Props) => {
  const { usdSendType } = useSendStore();

  const displayStep = () => {
    switch (usdSendType) {
      case null:
        return <SendOptions close={close} />;
      case "to Raizer":
        return <ToRaizers close={close} />;
      default:
        break;
    }
  };
  return <div className="">{displayStep()}</div>;
};

export default UsdSend;
