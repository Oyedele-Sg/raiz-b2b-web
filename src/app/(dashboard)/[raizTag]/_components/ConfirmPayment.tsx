import Button from "@/components/ui/Button";
import ListDetailItem from "@/components/ui/ListDetailItem";
import Overlay from "@/components/ui/Overlay";
import { useSendStore } from "@/store/Send";
import { getCurrencySymbol } from "@/utils/helpers";
import React from "react";

interface Props {
  close: () => void;
  fee: number;
  goNext: () => void;
  // handlePay: () => void;
  loading: boolean;
}

const ConfirmPayment = ({ close, fee, goNext, loading }: Props) => {
  const { amount, currency } = useSendStore();
  const handleSend = () => {
    // handlePay();
    goNext();
  };

  return (
    <Overlay close={close} width="400px">
      <div className="flex flex-col  h-full py-8 px-5 w-full">
        <p className="text-center   text-xl  font-bold mb-4  leading-tight">
          Confirm Payment
        </p>
        <div className="flex flex-col h-full justify-between items-center w-full">
          <div className="w-full flex flex-col gap-[15px]">
            <ListDetailItem
              title="Amount"
              value={`${getCurrencySymbol(currency || "")}
              ${amount.toLocaleString()}`}
            />
            <ListDetailItem
              title="Transaction fee"
              value={`${getCurrencySymbol(currency || "")}
              ${(fee / 100).toLocaleString()}`}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Button onClick={handleSend} loading={loading}>
              Send
            </Button>
            <Button onClick={close} variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default ConfirmPayment;
