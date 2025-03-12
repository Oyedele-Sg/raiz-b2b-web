import Overlay from "@/components/ui/Overlay";
import React from "react";
import Image from "next/image";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUSDWalletApi } from "@/services/business";
import { toast } from "sonner";
import { findWalletByCurrency } from "@/utils/helpers";
import { useUser } from "@/lib/hooks/useUser";

interface Props {
  close: () => void;
  openNgnModal: () => void;
}

const SelectAccount = ({ close, openNgnModal }: Props) => {
  const { user } = useUser();
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore();
  const NGNAcct = findWalletByCurrency(user, "NGN");
  const USDAcct = findWalletByCurrency(user, "USD");

  const qc = useQueryClient();
  const USDWalletMutation = useMutation({
    mutationFn: CreateUSDWalletApi,
    onSuccess: (response) => {
      toast.success(response?.message);
      qc.invalidateQueries({ queryKey: ["user"] });
      close();
    },
  });
  const handleNgn = () => {
    if (NGNAcct) {
      setSelectedCurrency("NGN", user);
      close();
    } else {
      openNgnModal();
    }
  };
  const handleUsd = () => {
    if (USDAcct) {
      setSelectedCurrency("USD", user);
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
              selectedCurrency.name === "USD" && USDAcct
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
                  {USDAcct
                    ? USDAcct?.account_number
                    : USDWalletMutation.isPending
                    ? "Creating your USD wallet..."
                    : "Get USD Account"}
                </p>
                <p className="opacity-50 text-raiz-gray-950 text-[13px] font-normal  leading-tight">
                  {USDAcct?.wallet_type.wallet_type_name || "USD Wallet"}
                </p>
              </div>
            </div>
            {USDAcct && selectedCurrency.name === "USD" && USDAcct && (
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
              selectedCurrency.name === "NGN" && NGNAcct
                ? "bg-[#eaecff]/60"
                : "bg-white"
            }`}
          >
            <div className="flex gap-3">
              <Image src={"/icons/ngn.svg"} alt="NGN" width={40} height={40} />
              <div className="flex flex-col items-start">
                <p className="text-raiz-gray-900 text-base font-medium font-brSonoma leading-tight">
                  {NGNAcct ? NGNAcct.account_number : "Get NGN Account"}
                </p>
                <p className="opacity-50 text-raiz-gray-950 text-[13px] font-normal  leading-tight">
                  {NGNAcct?.wallet_type.wallet_type_name || "NGN Wallet"}
                </p>
              </div>
            </div>
            {selectedCurrency.name === "NGN" && NGNAcct && (
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
