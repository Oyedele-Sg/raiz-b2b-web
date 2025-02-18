import React, { useState } from "react";
import SendOptions from "./SendOptions";
import { IUsdSendOptions } from "@/types/misc";
import ToRaizers from "./toRaizers/ToRaizers";

interface Props {
  close: () => void;
}

const UsdSend = ({ close }: Props) => {
  const [selectedOption, setSelectedOption] = useState<IUsdSendOptions | "all">(
    "all"
  );

  const displayStep = () => {
    switch (selectedOption) {
      case "all":
        return (
          <SendOptions close={close} setSelectedOption={setSelectedOption} />
        );
      case "to Raizer":
        return <ToRaizers goBack={() => setSelectedOption("all")} />;
      default:
        break;
    }
  };
  return <div className="font-monzo">{displayStep()}</div>;
};

export default UsdSend;
