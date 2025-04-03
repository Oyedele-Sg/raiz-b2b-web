import { ITransaction } from "@/types/transactions";

import React, { useState } from "react";
import TxnReceiptDetail from "./TxnReceiptDetail";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import { useUser } from "@/lib/hooks/useUser";
import SideModalWrapper from "../SideModalWrapper";

interface Props {
  close: () => void;
  transaction: ITransaction;
}

const TxnReceipt = ({ close, transaction }: Props) => {
  const [step, setStep] = useState(1);
  const { user } = useUser();

  const receiptDetails = transaction &&
    user && {
      senderName: user?.business_account?.business_name,
      beneficiaryName: transaction?.third_party_name,
      beneficiaryAccount: transaction?.beneficiary_account_number || "",
      beneficiaryBank: transaction?.beneficiary_bank_name || "",
      senderAccount: transaction?.source_account_number || "",
      transactionAmount: transaction?.transaction_amount,
      purpose: transaction?.transaction_remarks,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      date: transaction?.transaction_date_time as any,
      transactionType: transaction?.transaction_type?.transaction_type,
      sessionId: transaction?.session_id,
      referenceNumber: transaction?.transaction_reference,
      status: transaction?.transaction_status?.transaction_status,
      currency: transaction?.currency,
      close,
    };

  const displayScreen = () => {
    switch (step) {
      case 1:
        return (
          <TxnReceiptDetail
            close={close}
            transaction={transaction}
            goNext={() => setStep(2)}
          />
        );
      case 2:
        return (
          receiptDetails && (
            <SideModalWrapper close={close}>
              <RaizReceipt {...receiptDetails} />
            </SideModalWrapper>
          )
        );

      default:
        break;
    }
  };
  return <>{displayScreen()}</>;
};

export default TxnReceipt;
