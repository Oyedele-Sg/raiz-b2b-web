"use client";
import FailedStatus from "@/components/transactions/status/FailedStatus";
import LoadingStatus from "@/components/transactions/status/LoadingStatus";
import PendingStatus from "@/components/transactions/status/PendingStatus";
import SuccessStatus from "@/components/transactions/status/SuccessStatus";
import Overlay from "@/components/ui/Overlay";
import { useSwapStore } from "@/store/Swap";
import { PaymentStatusType } from "@/types/transactions";
import { getCurrencySymbol } from "@/utils/helpers";

interface Props {
  status: PaymentStatusType;
  close: () => void;
  error: string;
  tryAgain: () => void;
  viewReceipt: () => void;
}

const SwapStatusModal = ({ status, close, error, tryAgain }: Props) => {
  const { swapFromCurrency, swapToCurrency, amount } = useSwapStore();
  const user = {
    entity_id: "",
    account_name: "",
    username: "",
    selfie_image: null,
  };
  const displayStatus = () => {
    switch (status) {
      case "loading":
        return (
          <LoadingStatus
            user={user}
            loadingText={`Swapping  ${getCurrencySymbol(
              swapFromCurrency
            )}${amount} to ${swapToCurrency}`}
            type="p2p"
          />
        );
      case "success":
        return (
          <SuccessStatus
            text=""
            title={`Your swap was successful`}
            close={close}
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

export default SwapStatusModal;
