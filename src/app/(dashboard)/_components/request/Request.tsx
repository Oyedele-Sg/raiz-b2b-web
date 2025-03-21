"use client";
import React, { useState } from "react";
import RequestHome from "./RequestHome";
import AllRequests from "./AllRequests";
import RequestMoney from "./RequestMoney";

export type RequestStep = "home" | "all" | "request";

interface Props {
  close: () => void;
}

const Request = ({ close }: Props) => {
  const [step, setStep] = useState<RequestStep>("home");
  const displayScreen = () => {
    switch (step) {
      case "home":
        return <RequestHome close={close} setStep={setStep} />;
      case "all":
        return <AllRequests setStep={setStep} close={close} />;
      case "request":
        return <RequestMoney setStep={setStep} close={close} />;
      default:
        break;
    }
  };
  return <>{displayScreen()}</>;
};

export default Request;
