import React from "react";
import Overlay from "../ui/Overlay";
import LoadingStatus from "../transactions/status/LoadingStatus";
import { PaymentStatusType } from "@/types/transactions";
import { ISearchedUser } from "@/types/user";
import { getCurrencySymbol } from "@/utils/helpers";
import PendingStatus from "../transactions/status/PendingStatus";
import FailedStatus from "../transactions/status/FailedStatus";
import SuccessStatus from "../transactions/status/SuccessStatus";

interface Props {
  status: PaymentStatusType;
  amount: number;
  currency: string;
  user: ISearchedUser;
  close: () => void;
  error: string;
  tryAgain: () => void;
  viewReceipt: () => void;
}

const PaymentStatusModal = ({
  amount,
  currency,
  user,
  close,
  error,
  status,
  tryAgain,
  viewReceipt,
}: Props) => {
  const displayStatus = () => {
    switch (status) {
      case "loading":
        return (
          <LoadingStatus
            user={user}
            loadingText={`Sending  ${getCurrencySymbol(
              currency
            )}${amount?.toLocaleString()} to`}
          />
        );
      case "success":
        return (
          <SuccessStatus
            text="Your payment was successful!"
            title={`${getCurrencySymbol(
              currency
            )}${amount?.toLocaleString()} sent to ${user?.account_name} `}
            close={close}
            viewReceipt={viewReceipt}
            beneficiary={user}
          />
        );
      case "failed":
        return <FailedStatus close={close} error={error} tryAgain={tryAgain} />;
      case "pending":
        return <PendingStatus close={close} />;
      default:
        break;
    }
  };
  return (
    <Overlay close={() => {}} width="400px">
      <div className="flex flex-col h-[488px]  w-full from-indigo-900 to-violet-600">
        {displayStatus()}
      </div>
    </Overlay>
  );
};

export default PaymentStatusModal;
