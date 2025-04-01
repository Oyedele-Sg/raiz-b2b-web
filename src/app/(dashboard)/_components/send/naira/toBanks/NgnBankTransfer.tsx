"use client";
// import { useUser } from "@/lib/hooks/useUser";
import { useSendStore } from "@/store/Send";
import React, { useEffect, useState } from "react";
import SelectUser from "./SelectUser";
import SendMoney from "@/components/transactions/SendMoney";
import Categories from "@/components/transactions/Categories";
import { useQuery } from "@tanstack/react-query";
import { GetTransactionFeeApi } from "@/services/transactions";
import SendSummary from "@/components/transactions/SendSummary";
import ExternalPayout from "./ExternalPayout";
import PaymentStatusModal from "@/components/modals/PaymentStatusModal";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useUser } from "@/lib/hooks/useUser";

type NGNSendToBankStepType =
  | "select-user"
  | "details"
  | "summary"
  | "category"
  | "pay"
  | "status"
  | "receipt";

const NgnBankTransfer = () => {
  const { user } = useUser();
  const { externalUser, actions, amount, currency, status, transactionDetail } =
    useSendStore();
  const [step, setStep] = useState<NGNSendToBankStepType>("select-user");
  const [paymentError, setPaymentError] = useState("");

  const { data: fee } = useQuery({
    queryKey: ["transactions-fee", amount, currency],
    queryFn: () =>
      GetTransactionFeeApi(Number(amount), currency as "USD" | "NGN" | "WIRE"),
    enabled: !!amount,
  });

  useEffect(() => {
    if (step === "select-user" && externalUser) {
      setStep("details");
    }
  }, [externalUser, step]);
  const goBackToStep1 = () => {
    actions.reset("NGN");
    setStep("select-user");
  };

  const handleDone = () => {
    actions.reset("NGN");
    actions.selectNGNSendOption("to Raizer");
    close();
  };

  //   const totalPayable = fee ? parseFloat(amount) + fee : 0;

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

  const displayStep = () => {
    switch (step) {
      case "select-user":
        return <SelectUser />;
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
          <ExternalPayout
            goNext={() => setStep("status")}
            close={() => setStep("summary")}
            setPaymentError={setPaymentError}
            fee={fee || 0}
          />
        );
      case "status":
        return (
          currency &&
          externalUser && (
            <PaymentStatusModal
              status={status}
              amount={parseFloat(amount)}
              currency={currency}
              user={externalUser}
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
  return <>{displayStep()}</>;
};

export default NgnBankTransfer;
