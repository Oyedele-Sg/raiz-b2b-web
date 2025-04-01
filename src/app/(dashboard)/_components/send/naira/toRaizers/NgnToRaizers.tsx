"use client";
import { useUser } from "@/lib/hooks/useUser";
import React, { useEffect, useState } from "react";
import { SendToRaizStepType } from "../../usd/toRaizers/ToRaizers";
import { useSendStore } from "@/store/Send";
import FindRecipients from "@/components/transactions/FindRecipients";
import SendMoney from "@/components/transactions/SendMoney";
import Categories from "@/components/transactions/Categories";
import SendSummary from "@/components/transactions/SendSummary";
import Payout from "../../usd/toRaizers/Payout";
import PaymentStatusModal from "@/components/modals/PaymentStatusModal";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";
import { useP2PBeneficiaries } from "@/lib/hooks/useP2pBeneficiaries";

const NgnToRaizers = () => {
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
  const currentWallet = useCurrentWallet(user);

  const { favourites, recents } = useP2PBeneficiaries({
    walletId: currentWallet?.wallet_id,
    limit: 50,
  });

  useEffect(() => {
    if (step === "select-user" && selectedUser) {
      setStep("details");
    }
  }, [step, selectedUser]);

  const goBackToStep1 = () => {
    actions.reset("NGN");
    setStep("select-user");
  };

  const handleDone = () => {
    actions.reset("NGN");
    actions.selectNGNSendOption("to Raizer");
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
            recentUsers={recents || []}
            beneficiaries={favourites || []}
            setSelectedUser={actions.selectUser}
          />
        );
      case "details":
        return (
          <SendMoney
            goBack={goBackToStep1}
            goNext={() => setStep("category")}
            fee={0}
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
            fee={0}
          />
        );
      case "pay":
        return (
          <Payout
            goNext={() => setStep("status")}
            close={() => setStep("summary")}
            setPaymentError={setPaymentError}
            fee={0}
          />
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
              type="p2p"
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

export default NgnToRaizers;
