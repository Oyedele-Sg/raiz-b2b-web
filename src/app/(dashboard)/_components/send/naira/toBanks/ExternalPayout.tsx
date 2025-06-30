import EnterPin from "@/components/transactions/EnterPin";
import { useCurrentWallet } from "@/lib/hooks/useCurrentWallet";
import { useUser } from "@/lib/hooks/useUser";
import { ExternalNGNDebitApi } from "@/services/transactions";
import { useSendStore } from "@/store/Send";
import { IExternalTransferPayload } from "@/types/services";
import { passwordHash } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  close: () => void;
  goNext: () => void;
  setPaymentError: Dispatch<SetStateAction<string>>;
  fee: number;
}

const ExternalPayout = ({ close, goNext, setPaymentError }: Props) => {
  const [pin, setPin] = useState<string>("");
  const { externalUser, purpose, category, amount, actions } = useSendStore();
  const qc = useQueryClient();
  const { user } = useUser();
  const currentWallet = useCurrentWallet(user);

  const SendMoneyMutation = useMutation({
    mutationFn: (data: IExternalTransferPayload) =>
      ExternalNGNDebitApi({
        wallet_id: data.wallet_id,
        data: data.data,
        pin: data.pin,
      }),
    onMutate: () => {
      actions.setStatus("loading");
      goNext();
    },
    onSuccess: (response) => {
      qc.refetchQueries({ queryKey: ["user"] });
      qc.invalidateQueries({ queryKey: ["user"] });
      qc.invalidateQueries({ queryKey: ["transactions-report"] });
      qc.invalidateQueries({ queryKey: ["external-beneficiaries-recents"] });
      if (response?.transaction_status?.transaction_status === "completed") {
        actions.setStatus("success");
      } else if (
        response?.transaction_status?.transaction_status === "pending"
      ) {
        actions.setStatus("pending");
      }
      actions.setTransactionDetail(response);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (response: any) => {
      actions.setStatus("failed");
      setPaymentError(response?.data?.message);
    },
    onSettled: () => {
      goNext();
    },
  });

  //   const totalPayable = fee ? parseFloat(amount) + fee : amount;
  const handleSend = () => {
    const payload: IExternalTransferPayload = {
      wallet_id: currentWallet?.wallet_id || "",
      data: {
        beneficiary_account_name: externalUser?.bank_account_name || "",
        beneficiary_account_number: externalUser?.bank_account_number || "",
        transaction_amount: Number(amount),
        narration: purpose,
        beneficiary_bank_code: externalUser?.bank_short_code || "",
        beneficiary_bank_name: externalUser?.bank_name || "",
        transaction_category_id: category?.transaction_category_id || 0,
      },
      pin: {
        transaction_pin: passwordHash(pin),
      },
    };
    SendMoneyMutation.mutate(payload);
  };
  useEffect(() => {
    if (pin.length === 4) {
      handleSend();
    }
  }, [pin]);
  return <EnterPin pin={pin} setPin={setPin} close={close} />;
};

export default ExternalPayout;
