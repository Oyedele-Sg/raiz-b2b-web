import Overlay from "@/components/ui/Overlay";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useUser } from "@/lib/hooks/useUser";
import { useSwapStore } from "@/store/Swap";
import { IWallet } from "@/types/user";
import { ACCOUNT_CURRENCIES } from "@/constants/misc";

interface Props {
  close: () => void;
  //   setSelectedCurrency: () => void;
}

const SelectCurrencyModal = ({ close }: Props) => {
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { actions } = useSwapStore();
  const { user } = useUser();
  const wallets = user?.business_account?.wallets || [];

  const filteredWallets = useMemo(() => {
    return wallets.filter((wallet) =>
      wallet?.wallet_type.currency.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSelect = (wallet: IWallet) => {
    if (wallet.wallet_type.currency === ACCOUNT_CURRENCIES.NGN.name) {
      actions.switchSwapWallet(
        ACCOUNT_CURRENCIES.NGN.name,
        ACCOUNT_CURRENCIES.USD.name,
        wallets
      );
    } else {
      actions.switchSwapWallet(
        ACCOUNT_CURRENCIES.USD.name,
        ACCOUNT_CURRENCIES.NGN.name,
        wallets
      );
    }
    close();
  };
  return (
    <Overlay close={close} width="375px">
      <div className="flex flex-col  h-full py-8 px-5 ">
        <h5 className="text-raiz-gray-950 text-xl font-bold  leading-normal">
          Currency
        </h5>
        <div className="relative h-12 min-w-[300px]  mt-[15px] mb-[30px]">
          <Image
            className="absolute top-3.5 left-3"
            src={"/icons/search.svg"}
            alt="search"
            width={22}
            height={22}
          />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            className="pl-10 h-full bg-[#fcfcfc] rounded-[20px] border border-raiz-gray-200 justify-start items-center gap-2 inline-flex w-full outline-none text-sm"
          />
        </div>
        {filteredWallets.length > 0 ? (
          filteredWallets.map((wallet, index) => (
            <button
              onClick={() => handleSelect(wallet)}
              key={index}
              className="flex justify-between hover:bg-slate-100 p-3 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <Image
                  className="w-6 h-6 rounded-full"
                  src={
                    wallet.wallet_type.currency === "USD"
                      ? "/icons/dollar.svg"
                      : "/icons/ngn.svg"
                  }
                  alt={wallet?.wallet_name}
                  width={24}
                  height={14}
                />
                <span className="text-raiz-gray-950 text-sm font-semibold text-left">
                  {wallet?.wallet_type.wallet_type_name}
                </span>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-sm text-raiz-gray-600">
            No wallet found
          </p>
        )}
      </div>
    </Overlay>
  );
};

export default SelectCurrencyModal;
