"use client";
import React from "react";
import SideModalWrapper from "../../SideModalWrapper";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import { copyToClipboard, findWalletByCurrency } from "@/utils/helpers";
import Button from "@/components/ui/Button";
import { useUser } from "@/lib/hooks/useUser";
import { useCurrencyStore } from "@/store/useCurrencyStore";

interface Props {
  close: () => void;
}

const TopUp = ({ close }: Props) => {
  const { user } = useUser();
  const { selectedCurrency, selectedWallet } = useCurrencyStore();
  const NGNAcct = findWalletByCurrency(user, "NGN");
  const USDAcct = findWalletByCurrency(user, "USD");

  const getCurrentWallet = () => {
    if (selectedWallet) {
      return selectedWallet;
    } else {
      if (selectedCurrency.name === "NGN") {
        return NGNAcct;
      } else if (selectedCurrency.name === "USD") {
        return USDAcct;
      }
    }
  };

  const currentWallet = getCurrentWallet();
  return (
    <AnimatePresence>
      <SideModalWrapper close={close}>
        <div className="pb-8 flex flex-col justify-between xl:h-[95vh]">
          <div>
            <div className="flex justify-between items-center mb-4">
              <button onClick={close}>
                <Image
                  src={"/icons/arrow-left.svg"}
                  width={18.48}
                  height={18.48}
                  alt="back"
                />
              </button>
              <h5 className="text-raiz-gray-950 text-sm font-bold  leading-tight">
                Add Funds
              </h5>
              <div />
            </div>
            <p className="text-slate-800 text-sm font-normal pt-5 leading-snug">
              Make a bank transfer from another account using these details. The
              account number provided is unique to your Raiz account
            </p>
            <div className="p-7 bg-violet-100/60 rounded-[20px] inline-flex flex-col justify-center items-center gap-5 w-full my-[30px]">
              {/* Bank details */}
              <div className="w-full flex flex-col justify-center items-center">
                <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                  Bank Name
                </span>
                <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                  {currentWallet?.bank_name || ""}
                </p>
              </div>
              {/* Acct number */}
              <div className="w-full flex flex-col justify-center items-center">
                <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                  Account Number
                </span>
                <div className="flex items-center gap-2">
                  <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                    {currentWallet?.account_number || ""}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(currentWallet?.account_number || "")
                    }
                  >
                    <Image
                      src={"/icons/copy.svg"}
                      alt={"copy"}
                      width={16}
                      height={16}
                    />
                  </button>
                </div>
              </div>
              {/* Routing Number (ACH) */}
              {selectedCurrency.name === "USD" && (
                <div className="w-full flex flex-col justify-center items-center">
                  <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                    Routing Number (ACH)
                  </span>
                  <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                    {
                      currentWallet?.routing?.find(
                        (route) => route.routing_type_name === "ACH"
                      )?.routing
                    }
                  </p>
                </div>
              )}
              {/* Routing Number (WIRE) */}
              {selectedCurrency.name === "USD" && (
                <div className="w-full flex flex-col justify-center items-center">
                  <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                    Routing Number (WIRE)
                  </span>
                  <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                    {
                      currentWallet?.routing?.find(
                        (route) => route.routing_type_name === "WIRE"
                      )?.routing
                    }
                  </p>
                </div>
              )}
              {/* Currency */}
              <div className="w-full flex flex-col justify-center items-center">
                <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                  Currency
                </span>
                <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                  {currentWallet?.wallet_type.currency || ""}
                </p>
              </div>
              {/*  Address */}
              {selectedCurrency.name === "USD" && (
                <div className="w-full flex flex-col justify-center items-center">
                  <span className="text-center justify-start text-gray-500 text-base font-normal leading-normal">
                    Address
                  </span>
                  {/* Fix this */}
                  <p className="text-center justify-start text-zinc-900 text-lg font-semibold  leading-normal">
                    270 Park Avenue, NY 10017
                  </p>
                </div>
              )}
            </div>
            <p className=" text-slate-800 text-sm font-normal leading-snug mb-2">
              Transfer the amount you want to fund using mobile banking
            </p>
            <p className=" text-slate-800 text-sm font-normal leading-snug">
              Your Raiz account balance will be funded immediately
            </p>
          </div>
          <Button
            onClick={() => copyToClipboard(currentWallet?.account_number || "")}
          >
            Copy Account Details
          </Button>
        </div>
      </SideModalWrapper>
    </AnimatePresence>
  );
};

export default TopUp;
