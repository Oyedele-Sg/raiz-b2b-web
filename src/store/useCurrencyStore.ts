import { create } from "zustand";
import { AccountCurrencyType } from "@/types/misc";
import { ACCOUNT_CURRENCIES } from "@/constants/misc";
import { IUser, IWallet } from "@/types/user";
import { findWalletByCurrency } from "@/utils/helpers";

interface AccountCurrencyState {
  selectedCurrency: AccountCurrencyType;
  setSelectedCurrency: (
    currency: keyof typeof ACCOUNT_CURRENCIES,
    user: IUser | undefined
  ) => void;
  selectedWallet: IWallet | undefined;
}

export const useCurrencyStore = create<AccountCurrencyState>((set) => ({
  selectedCurrency: ACCOUNT_CURRENCIES.USD, // Default currency
  selectedWallet: undefined,
  setSelectedCurrency: (currency, user) =>
    set({
      selectedCurrency: ACCOUNT_CURRENCIES[currency],
      selectedWallet: findWalletByCurrency(
        user,
        ACCOUNT_CURRENCIES[currency].name
      ),
    }),
}));
