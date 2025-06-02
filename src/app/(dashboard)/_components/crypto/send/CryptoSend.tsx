"use client";
import React, { useState } from "react";
import CoinTypeModal from "./CoinTypeModal";
import AddRecipient from "./AddRecipient";
import ReviewModal from "./ReviewModal";
import SendCrypto from "./SendCrypto";
import CryptoSendSummary from "./CryptoSendSummary";
import CryptoPay from "./CryptoPay";
import { useSendStore } from "@/store/Send";
import CryptoPayStatusModal from "./CryptoPayStatusModal";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useQuery } from "@tanstack/react-query";
import { GetIntTransactionFeeApi } from "@/services/transactions";

export type cryptoSendSteps =
  | "coin-type"
  | "add-recipient"
  | "review"
  | "send"
  | "summary"
  | "pay"
  | "status"
  | "receipt";
export type sbcType = "USDC" | "USDT";

interface Props {
  close: () => void;
}
const CryptoSend = ({ close }: Props) => {
  const [step, setStep] = useState<cryptoSendSteps | null>("coin-type");
  const [coinType, setCoinType] = useState<sbcType | null>(null);
  const [paymentError, setPaymentError] = useState("");
  const { actions, amount, status, transactionDetail, currency } =
    useSendStore();

  const { data: fee, isLoading } = useQuery({
    queryKey: ["transactions-fee", amount, currency],
    queryFn: () => GetIntTransactionFeeApi(Number(amount), "CRYPTO"),
    enabled: !!amount,
  });

  const handleDone = () => {
    actions.reset("SBC");
    close();
  };
  const displayStep = () => {
    switch (step) {
      case "coin-type":
        return (
          <CoinTypeModal
            close={close}
            type={coinType}
            setType={setCoinType}
            goNext={() => setStep("add-recipient")}
          />
        );
      case "add-recipient":
        return (
          <AddRecipient
            close={() => {
              setStep(null);
              close();
            }}
            goNext={() => setStep("review")}
          />
        );
      case "review":
        return (
          <ReviewModal
            close={() => setStep("add-recipient")}
            goNext={() => setStep("send")}
          />
        );
      case "send":
        return (
          <SendCrypto
            goBack={() => setStep("review")}
            goNext={() => setStep("summary")}
            fee={fee || 0}
            loading={isLoading}
          />
        );
      case "summary":
        return (
          <CryptoSendSummary
            goBack={() => setStep("send")}
            goNext={() => setStep("pay")}
            fee={fee || 0}
          />
        );
      case "pay":
        return (
          <CryptoPay
            goNext={() => setStep("status")}
            close={() => setStep("summary")}
            setPaymentError={setPaymentError}
            fee={fee || 0}
          />
        );
      case "status":
        return (
          <CryptoPayStatusModal
            status={status}
            amount={parseFloat(amount)}
            close={handleDone}
            error={paymentError}
            tryAgain={() => setStep("summary")}
            viewReceipt={() => setStep("receipt")}
          />
        );

      case "receipt":
        return (
          transactionDetail && (
            <RaizReceipt close={handleDone} data={transactionDetail} />
          )
        );
      default:
        break;
    }
  };
  return <>{displayStep()}</>;
};

export default CryptoSend;
