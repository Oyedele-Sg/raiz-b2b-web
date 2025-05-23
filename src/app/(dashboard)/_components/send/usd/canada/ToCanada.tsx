import React, { useState } from "react";
import ToInterac from "./interac/ToInterac";
import SendOptions from "../SendOptions";
import CanadaTypeModal from "./CanadaTypeModal";
import ToEft from "./eft/ToEft";

export type canadaSendType = "interac" | "eft" | "tuition";

interface Props {
  close: () => void;
}

const ToCanada = ({ close }: Props) => {
  const [sendType, setSendType] = useState<canadaSendType | undefined>(
    undefined
  );
  const displayScreen = () => {
    switch (sendType) {
      case undefined:
        return (
          <>
            <SendOptions close={close} />
            <CanadaTypeModal
              close={close}
              type={sendType}
              setType={setSendType}
            />
          </>
        );
      case "interac":
        return <ToInterac close={close} />;
      case "eft":
        return <ToEft close={close} />;
      case "tuition":
        return (
          <div>
            <h1>Tuition</h1>
          </div>
        );
      default:
        break;
    }
  };
  return <>{displayScreen()}</>;
};

export default ToCanada;
