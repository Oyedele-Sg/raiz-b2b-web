"use client";
import React, { useEffect, useState } from "react";
import { useSendStore } from "@/store/Send";
import FindRecipients from "@/components/transactions/FindRecipients";
import SendDetail from "./SendDetail";
import Categories from "@/components/transactions/Categories";
import SendSummary from "@/components/transactions/SendSummary";
import Payout from "./Payout";
import PaymentStatusModal from "@/components/modals/PaymentStatusModal";
import { useQuery } from "@tanstack/react-query";
import { GetTransactionFeeApi } from "@/services/transactions";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useUser } from "@/lib/hooks/useUser";

export type SendToRaizStepType =
  | "select-user"
  | "details"
  | "category"
  | "summary"
  | "pay"
  | "status"
  | "receipt";

const ToRaizers = ({ close }: { close: () => void }) => {
  const {
    actions,
    user: selectedUser,
    status,
    amount,
    currency,
    transactionDetail,
  } = useSendStore();
  const { user } = useUser();
  const [step, setStep] = useState<SendToRaizStepType>("select-user");
  const [paymentError, setPaymentError] = useState("");

  const { data: fee } = useQuery({
    queryKey: ["transactions-fee", amount, currency],
    queryFn: () =>
      GetTransactionFeeApi(Number(amount), currency as "USD" | "NGN" | "WIRE"),
    enabled: !!amount,
  });

  useEffect(() => {
    if (step === "select-user" && selectedUser) {
      setStep("details");
    }
  }, [step, selectedUser]);

  const goBackToStep1 = () => {
    actions.selectUser(null);
    setStep("select-user");
  };

  const handleDone = () => {
    actions.reset();
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

  const displayStep = () => {
    switch (step) {
      case "select-user":
        return (
          <FindRecipients
            recentUsers={[]}
            beneficiaries={[]}
            setSelectedUser={actions.selectUser}
            header
            goBack={() => actions.selectSendOption(null)}
          />
        );
      case "details":
        return (
          <SendDetail
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
          fee && (
            <SendSummary
              goBack={() => setStep("category")}
              goNext={() => setStep("pay")}
              fee={fee}
            />
          )
        );
      case "pay":
        return (
          fee && (
            <Payout
              goNext={() => setStep("status")}
              close={() => setStep("summary")}
              setPaymentError={setPaymentError}
              fee={fee}
            />
          )
        );
      case "status":
        return (
          currency &&
          selectedUser && (
            <PaymentStatusModal
              status={status}
              amount={parseFloat(amount)}
              currency={currency}
              user={selectedUser}
              close={handleDone}
              error={paymentError}
              tryAgain={() => setStep("summary")}
              viewReceipt={() => setStep("receipt")}
            />
          )
        );
      case "receipt":
        return receiptDetails && <RaizReceipt {...receiptDetails} />;
      default:
        break;
    }
  };
  return <div>{displayStep()}</div>;
};

export default ToRaizers;
