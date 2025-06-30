import { create } from "zustand";
import { AccountCurrencyType } from "@/types/misc";
import { ACCOUNT_CURRENCIES } from "@/constants/misc";
import { IUser, IWallet } from "@/types/user";
import { findWalletByCurrency } from "@/utils/helpers";
import { persist } from "zustand/middleware";

interface AccountCurrencyState {
  selectedCurrency: AccountCurrencyType;
  setSelectedCurrency: (
    currency: keyof typeof ACCOUNT_CURRENCIES,
    user: IUser | undefined
  ) => void;
  selectedWallet: IWallet | undefined;
}

export const useCurrencyStore = create<AccountCurrencyState>()(
  persist(
    (set) => ({
      selectedCurrency: ACCOUNT_CURRENCIES.USD, // Default currency
      selectedWallet: undefined,
      setSelectedCurrency: (currency, user) =>
        set(() => {
          const selectedCurrency = ACCOUNT_CURRENCIES[currency];
          const selectedWallet = findWalletByCurrency(
            user,
            selectedCurrency.name
          );
          return { selectedCurrency, selectedWallet };
        }),
    }),
    {
      name: "currency-store",
      storage: {
        getItem: (name) => {
          const value = sessionStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
