"use client";
import React, { useEffect, useState } from "react";
import { ToUsdBanksStepsType } from "../bankTransfer/toBanks/ToUsdBanks";
import { useSendStore } from "@/store/Send";
import { GetTransactionFeeApi } from "@/services/transactions";
import { useQuery } from "@tanstack/react-query";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import PaymentStatusModal from "@/components/modals/PaymentStatusModal";
import UsdBankPay from "../bankTransfer/toBanks/UsdBankPay";
import SendSummary from "@/components/transactions/SendSummary";
import Categories from "@/components/transactions/Categories";
import SendMoney from "@/components/transactions/SendMoney";
import AddInteracBeneficiary from "./AddInteracBeneficiary";

interface Props {
  close: () => void;
}

const ToInterac = ({}: Props) => {
  const [step, setStep] = useState<ToUsdBanksStepsType>("add-beneficiary");
  const [paymentError, setPaymentError] = useState("");
  const {
    usdBeneficiary,
    actions,
    amount,
    currency,
    status,
    transactionDetail,
  } = useSendStore();
  const goBackToStep1 = () => {
    actions.selectUsdBeneficiary(null);
    setStep("add-beneficiary");
  };
  const { data: fee } = useQuery({
    queryKey: ["transactions-fee", amount, currency],
    queryFn: () =>
      GetTransactionFeeApi(Number(amount), currency as "USD" | "NGN" | "WIRE"),
    enabled: !!amount,
  });
  useEffect(() => {
    if (usdBeneficiary) {
      setStep("details");
    }
  }, [usdBeneficiary]);
  const handleDone = () => {
    actions.reset("USD");
    actions.selectUSDSendOption(null);
    close();
  };

  const displayScreen = () => {
    switch (step) {
      case "add-beneficiary":
        return <AddInteracBeneficiary close={close} />;
      case "details":
        return (
          <SendMoney
            goBack={goBackToStep1}
            goNext={() => setStep("category")}
            fee={fee || 0}
          />
        );
      case "category":
        return (
          <Categories
            goBack={() => setStep("details")}
            goNext={() => setStep("summary")}
            loading={false}
          />
        );
      case "summary":
        return (
          <SendSummary
            goBack={() => setStep("category")}
            goNext={() => setStep("pay")}
            fee={fee || 0}
          />
        );
      case "pay":
        return (
          <UsdBankPay
            goNext={() => setStep("status")}
            close={() => setStep("summary")}
            setPaymentError={setPaymentError}
            fee={fee || 0}
          />
        );
      case "status":
        return (
          currency &&
          usdBeneficiary && (
            <PaymentStatusModal
              status={status}
              amount={parseFloat(amount)}
              currency={currency}
              user={usdBeneficiary}
              close={handleDone}
              error={paymentError}
              tryAgain={() => setStep("summary")}
              viewReceipt={() => setStep("receipt")}
              type="external"
            />
          )
        );
      case "receipt":
        return (
          transactionDetail && (
            <RaizReceipt data={transactionDetail} close={handleDone} />
          )
        );
      default:
        break;
    }
  };

  return <>{displayScreen()}</>;
};

export default ToInterac;
