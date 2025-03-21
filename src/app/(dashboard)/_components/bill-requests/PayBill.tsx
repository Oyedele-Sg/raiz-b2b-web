"use client";
import NumberKeypad from "@/components/ui/NumberKeyPad";
import Overlay from "@/components/ui/Overlay";
import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";
import { useUser } from "@/lib/hooks/useUser";
import { AcceptRequestApi } from "@/services/transactions";
import { IBillRequest, PaymentStatusType } from "@/types/transactions";
import { useMutation } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  close: () => void;
  goNext: () => void;
  setStatus: Dispatch<SetStateAction<PaymentStatusType>>;
  status: PaymentStatusType;
  request: IBillRequest;
  setPaymentError: Dispatch<SetStateAction<string>>;
}

const PayBill = ({
  close,
  goNext,
  setStatus,
  request,
  setPaymentError,
}: Props) => {
  const { user } = useUser();
  const currentWallet = useCurrentWallet(user);
  const [pin, setPin] = useState<string>("");

  const AcceptBillMutation = useMutation({
    mutationFn: () =>
      AcceptRequestApi({
        transaction_pin: pin,
        params: {
          wallet_id: currentWallet?.wallet_id || "",
          request_id: request?.request_transfer_id,
        },
      }),
    onMutate: () => {
      setStatus("loading");
      goNext();
    },
    onSuccess: (response) => {
      toast.success(response?.message);
      setStatus("success");
      goNext();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (response: any) => {
      setStatus("failed");
      setPaymentError(response?.data?.message);
    },
    onSettled: () => {
      goNext();
    },
  });

  useEffect(() => {
    if (pin.length === 4) {
      AcceptBillMutation.mutate();
    }
  }, [pin]);
  return (
    <Overlay width="385px" close={close}>
      <div
        className={`flex flex-col lg:h-[90%] xl:h-full
        }  py-8 px-5  text-raiz-gray-950 overflow-y-scroll`}
      >
        <h2 className=" text-xl font-bold  leading-normal">Enter Pin</h2>
        <div className="my-[30px]">
          <NumberKeypad otpValue={pin} setOtpValue={setPin} />
        </div>
      </div>
    </Overlay>
  );
};

export default PayBill;
