"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ToUsdBanksStepsType } from "../toBanks/ToUsdBanks";
import { bankTypeProp } from "../BankTransfer";
import { useSendStore } from "@/store/Send";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GetTransactionFeeApi,
  SendInternationalInitialPayout,
} from "@/services/transactions";
import AddBeneficiary from "../toBanks/AddBeneficiary";
import Categories from "@/components/transactions/Categories";
import PaymentStatusModal from "@/components/modals/PaymentStatusModal";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useUser } from "@/lib/hooks/useUser";
import InternationPayout from "./InternationalPayout";
import InternationalSendSummary from "@/components/transactions/InternationalSendSummary";
import InternationalSendMoney from "@/components/transactions/InternationalSendMoney";

interface Props {
  close: () => void;
  bankType: bankTypeProp;
  setBankType: Dispatch<SetStateAction<bankTypeProp | undefined>>;
}

const ToInternational = ({ close, bankType }: Props) => {
  const { user } = useUser();
  const [step, setStep] = useState<ToUsdBanksStepsType>("add-beneficiary");
  const [paymentError, setPaymentError] = useState("");
  const [paymentInitiationId, setPaymentInitiationId] = useState("");
  const {
    intBeneficiary,
    actions,
    amount,
    currency,
    status,
    transactionDetail,
  } = useSendStore();
  const { data: fee } = useQuery({
    queryKey: ["transactions-fee", amount, currency],
    queryFn: () =>
      GetTransactionFeeApi(Number(amount), currency as "USD" | "NGN" | "WIRE"),
    enabled: !!amount,
  });
  useEffect(() => {
    if (bankType) {
      setTimeout(() => setStep("add-beneficiary"), 200);
    }
  }, [bankType]);

  useEffect(() => {
    if (intBeneficiary) {
      setStep("details");
    }
  }, [intBeneficiary]);

  const goBackToStep2 = () => {
    actions.selectIntBeneficiary(null);
    setStep("add-beneficiary");
  };

  const InitiatePayMutation = useMutation({
    mutationFn: () =>
      SendInternationalInitialPayout({
        foreign_payout_beneficiary_id:
          intBeneficiary?.foreign_payout_beneficiary_id || "",
        amount: parseFloat(amount),
      }),
    onSuccess: (response) => {
      setPaymentInitiationId(response?.payout_initiation_id);
      setStep("category");
    },
  });
  const initiatePayout = () => {
    InitiatePayMutation.mutate();
  };

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

  const displayStep = () => {
    switch (step) {
      case "add-beneficiary":
        return bankType && <AddBeneficiary type={bankType} close={close} />;
      case "details":
        return (
          <InternationalSendMoney
            goBack={goBackToStep2}
            goNext={initiatePayout}
            fee={fee || 0}
            loading={InitiatePayMutation.isPending}
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
          <InternationalSendSummary
            goBack={() => setStep("category")}
            goNext={() => setStep("pay")}
            fee={fee || 0}
          />
        );
      case "pay":
        return (
          <InternationPayout
            paymentInitiationId={paymentInitiationId}
            goNext={() => setStep("status")}
            close={() => setStep("summary")}
            setPaymentError={setPaymentError}
            fee={fee || 0}
          />
        );
      case "status":
        return (
          currency &&
          intBeneficiary && (
            <PaymentStatusModal
              status={status}
              amount={parseFloat(amount)}
              currency={
                intBeneficiary?.foreign_payout_beneficiary?.beneficiary_currency
              }
              user={intBeneficiary}
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

export default ToInternational;
