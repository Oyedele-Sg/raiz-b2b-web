"use client";
import React, { useEffect, useState } from "react";
import { ToUsdBanksStepsType } from "../bankTransfer/toBanks/ToUsdBanks";
import AddCardBeneficiary from "./AddCardBeneficiary";
import SendMoney from "@/components/transactions/SendMoney";
import { useSendStore } from "@/store/Send";
import { useQuery } from "@tanstack/react-query";
import { GetTransactionFeeApi } from "@/services/transactions";
import Categories from "@/components/transactions/Categories";
import SendSummary from "@/components/transactions/SendSummary";
import UsdBankPay from "../bankTransfer/toBanks/UsdBankPay";
import { useUser } from "@/lib/hooks/useUser";
import PaymentStatusModal from "@/components/modals/PaymentStatusModal";
import RaizReceipt from "@/components/transactions/RaizReceipt";

interface Props {
  close: () => void;
}
const ToDebitCard = ({ close }: Props) => {
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
  const { user } = useUser();
  const { data: fee } = useQuery({
    queryKey: ["transactions-fee", amount, currency],
    queryFn: () =>
      GetTransactionFeeApi(Number(amount), currency as "USD" | "NGN" | "WIRE"),
    enabled: !!amount,
  });
  const goBackToStep1 = () => {
    actions.selectUsdBeneficiary(null);
    setStep("add-beneficiary");
  };

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

  const receiptDetails = transactionDetail &&
    user && {
      senderName: user?.business_account?.business_name,
      beneficiaryName: transactionDetail?.third_party_name,
      beneficiaryAccount: transactionDetail?.beneficiary_account_number,
      beneficiaryBank: transactionDetail?.beneficiary_bank_name,
      senderAccount: transactionDetail?.source_account_number,
      transactionAmount: transactionDetail?.transaction_amount,
      purpose: transactionDetail?.transaction_remarks,
      date: transactionDetail?.transaction_date_time,
      transactionType: transactionDetail?.transaction_type?.transaction_type,
      sessionId: transactionDetail?.session_id,
      referenceNumber: transactionDetail?.transaction_reference,
      status: transactionDetail?.transaction_status?.transaction_status,
      currency: transactionDetail?.currency,
      close: handleDone,
    };

  const displayScreen = () => {
    switch (step) {
      case "add-beneficiary":
        return <AddCardBeneficiary close={close} />;
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
        return receiptDetails && <RaizReceipt {...receiptDetails} />;
      default:
        break;
    }
  };
  return <>{displayScreen()}</>;
};

export default ToDebitCard;
