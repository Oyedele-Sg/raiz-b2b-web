import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUSDWalletApi } from "@/services/business";
import { toast } from "sonner";

interface Props {
  close: () => void;
  openNgnModal: () => void;
}

const SelectAccount = ({ close, openNgnModal }: Props) => {
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore();

  const qc = useQueryClient();
  const USDWalletMutation = useMutation({
    mutationFn: CreateUSDWalletApi,
    onSuccess: (response) => {
      toast.success(response?.message);
      qc.invalidateQueries({ queryKey: ["user"] });
      close();
    },
  });
  const hasNGNWallet = false;
  const hasUSDWallet = false;
  const handleNgn = () => {
    if (hasNGNWallet) {
      setSelectedCurrency("NGN");
      close();
    } else {
      openNgnModal();
    }
  };
  const handleUsd = () => {
    if (hasUSDWallet) {
      setSelectedCurrency("USD");
      close();
    } else {
      USDWalletMutation.mutate();
    }
  };
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5  text-raiz-gray-950">
        <h4 className="text-xl font-semibold">Select Account</h4>
        <div className="flex flex-col mt-4">
          {/* USD */}
          <button
            onClick={handleUsd}
            className={`px-3 py-4  justify-between items-center gap-10 rounded-[20px] w-full  inline-flex ${
              selectedCurrency.name === "USD" && hasUSDWallet
                ? "bg-[#eaecff]/60"
                : "bg-white"
            }`}
          >
            <div className="flex gap-3">
              <Image
                src={"/icons/dollar.svg"}
                alt="USD"
                width={40}
                height={40}
              />
              <div className="flex flex-col items-start">
                <p className="text-raiz-gray-900 text-base font-medium font-brSonoma leading-tight">
                  {hasUSDWallet
                    ? "5000200030"
                    : USDWalletMutation.isPending
                    ? "Creating your USD wallet..."
                    : "Get USD Account"}
                </p>
                <p className="opacity-50 text-raiz-gray-950 text-[13px] font-normal  leading-tight">
                  USD Wallet
                </p>
              </div>
            </div>
            {hasUSDWallet && selectedCurrency.name === "USD" && (
              <Image
                src={"/icons/tick-circle.svg"}
                alt=""
                width={24}
                height={24}
              />
            )}
          </button>

          {/* NGN */}
          <button
            onClick={handleNgn}
            className={`px-3 py-4  justify-between items-center gap-10 w-full rounded-[20px]  inline-flex ${
              selectedCurrency.name === "NGN" && hasNGNWallet
                ? "bg-[#eaecff]/60"
                : "bg-white"
            }`}
          >
            <div className="flex gap-3">
              <Image src={"/icons/ngn.svg"} alt="NGN" width={40} height={40} />
              <div className="flex flex-col items-start">
                <p className="text-raiz-gray-900 text-base font-medium font-brSonoma leading-tight">
                  {hasNGNWallet ? "5000200030" : "Get NGN Account"}
                </p>
                <p className="opacity-50 text-raiz-gray-950 text-[13px] font-normal  leading-tight">
                  NGN Wallet
                </p>
              </div>
            </div>
            {selectedCurrency.name === "NGN" && hasNGNWallet && (
              <Image
                src={"/icons/tick-circle.svg"}
                alt="USD"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      </div>
    </Overlay>
  );
};

export default SelectAccount;
