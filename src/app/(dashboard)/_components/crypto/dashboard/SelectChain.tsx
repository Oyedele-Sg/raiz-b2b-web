"use client";
import Overlay from "@/components/ui/Overlay";
import { IChain } from "@/types/misc";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCryptoWalletApi } from "@/services/business";
import { toast } from "sonner";
import { memo } from "react";
import { CHAINS } from "@/constants/misc";
import { useUser } from "@/lib/hooks/useUser";

interface Props {
  close: () => void;
  done: () => void;
}

const SelectChain = ({ close, done }: Props) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [mutatingChain, setMutatingChain] = useState<IChain | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCryptoWalletApi,
    onSuccess: (response) => {
      toast.success(response?.message || "Wallet created successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setMutatingChain(null);
      close();
      done();
    },
  });

  const handleCreate = useCallback(
    (chain: IChain) => {
      setMutatingChain(chain);
      mutate(chain);
    },
    [mutate]
  );

  const cryptoWallets =
    user?.business_account?.wallets.find(
      (i) => i.wallet_type.currency === "SBC"
    )?.secondary_crypto_details || [];

  const addedChains = Array.isArray(cryptoWallets)
    ? cryptoWallets.map((wallet) => wallet?.chain)
    : [];

  const remainingChains = CHAINS.filter(
    (chain) => !addedChains.includes(chain.value)
  );

  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col h-full py-8 px-5 text-raiz-gray-950">
        <h4 className="text-xl font-semibold mb-6">Select a Chain</h4>

        <div className="flex flex-col gap-3">
          {remainingChains?.map((chain) => (
            <div key={chain.value} className="flex items-center gap-2">
              <button
                disabled={isPending}
                onClick={() => handleCreate(chain.value)}
                className={`flex items-center justify-between p-3 border rounded-lg text-left text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 border-transparent hover:bg-raiz-gray-100 hover:scale-105 w-full ${
                  isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-label={`Select ${chain.name} chain`}
              >
                <span className="flex items-center gap-3 text-raiz-gray-900">
                  <Image
                    src={chain.icon}
                    alt={`${chain.name} icon`}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                  {chain.name}
                </span>
              </button>
              {isPending && mutatingChain === chain.value && (
                <svg
                  className="animate-spin h-4 w-4 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default memo(SelectChain);
