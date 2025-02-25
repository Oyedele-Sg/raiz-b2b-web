import React, { useState } from "react";
import FindRecipients from "./FindRecipients";

const ToRaizers = ({ goBack }: { goBack: () => void }) => {
  const [step, setStep] = useState(1);
  const displayStep = () => {
    switch (step) {
      case 1:
        return <FindRecipients goBack={goBack} setStep={setStep} />;
      default:
        break;
    }
  };
  return <div>{displayStep()}</div>;
};

export default ToRaizers;
