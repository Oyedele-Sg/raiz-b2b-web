import { ITransaction } from "@/types/transactions";

import React, { useState } from "react";
import TxnReceiptDetail from "./TxnReceiptDetail";
import RaizReceipt from "@/components/transactions/RaizReceipt";
import SideModalWrapper from "../SideModalWrapper";

interface Props {
  close: () => void;
  transaction: ITransaction;
}

const TxnReceipt = ({ close, transaction }: Props) => {
  const [step, setStep] = useState(1);

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
          transaction && (
            <SideModalWrapper close={close}>
              <RaizReceipt close={close} data={transaction} />
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
