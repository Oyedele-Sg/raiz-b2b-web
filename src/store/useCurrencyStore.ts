import { create } from "zustand";
import { AccountCurrencyType } from "@/types/misc";
import { ACCOUNT_CURRENCIES } from "@/constants/misc";

interface AccountCurrencyState {
  selectedCurrency: AccountCurrencyType;
  setSelectedCurrency: (currency: keyof typeof ACCOUNT_CURRENCIES) => void;
}

export const useCurrencyStore = create<AccountCurrencyState>((set) => ({
  selectedCurrency: ACCOUNT_CURRENCIES.USD, // Default currency
  setSelectedCurrency: (currency) =>
    set({ selectedCurrency: ACCOUNT_CURRENCIES[currency] }),
}));
