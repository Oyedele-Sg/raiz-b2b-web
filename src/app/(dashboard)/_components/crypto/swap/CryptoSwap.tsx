"use client";
import { useCryptoSwapStore } from "@/store/CryptoSwap";
import React, { useState } from "react";
import SwapCoinType from "./SwapCoinType";
import CryptoSwapDetail from "./CryptoSwapDetail";
import CryptoSwapConfirmation from "./CryptoSwapConfirmation";
import CryptoSwapPay from "./CryptoSwapPay";
import SwapStatusModal from "../../swap/SwapStatusModal";

export type CryptoSwapStep =
  | "coin-type"
  | "detail"
  | "confirmation"
  | "pay"
  | "status"
  | "receipt";

interface Props {
  close: () => void;
}

const CryptoSwap = ({ close }: Props) => {
  const [step, setStep] = useState<CryptoSwapStep>("coin-type");
  const { status, actions, swapFromCurrency, swapToCurrency, amount } =
    useCryptoSwapStore();
  const [paymentError, setPaymentError] = useState("");

  const handleDone = () => {
    actions.reset();
    close();
  };

  const displayScreen = () => {
    switch (step) {
      case "coin-type":
        return (
          <SwapCoinType close={handleDone} goNext={() => setStep("detail")} />
        );
      case "detail":
        return (
          <CryptoSwapDetail
            close={handleDone}
            goNext={() => {
              setStep("confirmation");
            }}
          />
        );
      case "confirmation":
        return (
          <CryptoSwapConfirmation
            goBack={() => setStep("detail")}
            goNext={() => setStep("pay")}
          />
        );
      case "pay":
        return (
          <CryptoSwapPay
            goNext={() => setStep("status")}
            close={() => setStep("confirmation")}
            setPaymentError={setPaymentError}
          />
        );
      case "status":
        return (
          <SwapStatusModal
            status={status}
            close={handleDone}
            error={paymentError}
            tryAgain={() => setStep("confirmation")}
            viewReceipt={() => setStep("receipt")}
            swapFromCurrency={swapFromCurrency}
            swapToCurrency={swapToCurrency}
            amount={amount}
          />
        );
      default:
        break;
    }
  };
  return <div>{displayScreen()}</div>;
};

export default CryptoSwap;
