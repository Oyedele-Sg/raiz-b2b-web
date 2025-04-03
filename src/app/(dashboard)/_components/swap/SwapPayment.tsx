"use client";
import EnterPin from "@/components/transactions/EnterPin";
import { BuyDollarApi, SellDollarApi } from "@/services/transactions";
import { useSwapStore } from "@/store/Swap";
import { passwordHash } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  goNext: () => void;
  setPaymentError: Dispatch<SetStateAction<string>>;
  close: () => void;
}

const SwapPayment = ({ goNext, setPaymentError, close }: Props) => {
  const { swapFromCurrency, amount, actions } = useSwapStore();
  const [pin, setPin] = useState<string>("");
  const qc = useQueryClient();
  const swapMutation =
    swapFromCurrency === "NGN" ? BuyDollarApi : SellDollarApi;
  const SwapMoneyMutation = useMutation({
    mutationFn: () =>
      swapMutation({
        amount: parseFloat(amount),
        currency: "NGN",
        transaction_pin: passwordHash(pin),
      }),
    onMutate: () => {
      actions.setStatus("loading");
      goNext();
    },
    onSuccess: (response) => {
      qc.refetchQueries({ queryKey: ["user"] });
      qc.invalidateQueries({ queryKey: ["user"] });
      qc.invalidateQueries({ queryKey: ["transactions-report"] });
      if (response?.transaction_status?.transaction_status === "completed") {
        actions.setStatus("success");
      } else if (
        response?.transaction_status?.transaction_status === "pending"
      ) {
        actions.setStatus("pending");
      }
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
  const handleSend = () => {
    SwapMoneyMutation.mutate();
  };
  useEffect(() => {
    if (pin.length === 4) {
      handleSend();
    }
  }, [pin]);
  return <EnterPin pin={pin} setPin={setPin} close={close} />;
};

export default SwapPayment;
