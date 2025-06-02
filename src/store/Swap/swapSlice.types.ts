/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCOUNT_CURRENCIES, SWAP_ACCOUNT_CURRENCIES } from "@/constants/misc";
import { PaymentStatusType } from "@/types/transactions";
import { IWallet } from "@/types/user";

export type CurrencyTypeKey = keyof typeof SWAP_ACCOUNT_CURRENCIES;

export interface SwapState {
  swapFromWallet: Record<any, any> | null;
  swapToWallet: Record<string, any> | null;
  swapFromCurrency: CurrencyTypeKey;
  swapToCurrency: CurrencyTypeKey;
  amount: string;
  transactionPin: string;
  walletData?: {
    wallets: Array<{ wallet_type: { currency: CurrencyTypeKey } }>;
  };
  status: PaymentStatusType | null;
}

export interface SwapActions {
  switchSwapWallet: (
    swapFromCurrency: CurrencyTypeKey,
    swapToCurrency: CurrencyTypeKey,
    walletData?: IWallet[]
  ) => void;
  setAmount: (amount: string) => void;
  setTransactionPin: (pin: string) => void;
  setStatus: (status: PaymentStatusType | null) => void;
  reset: () => void;
}

export const initialSwapState: SwapState = {
  swapFromWallet: null,
  swapToWallet: null,
  swapFromCurrency: ACCOUNT_CURRENCIES.USD.name,
  swapToCurrency: ACCOUNT_CURRENCIES.NGN.name,
  amount: "",
  transactionPin: "",
  walletData: undefined,
  status: null,
};

export interface SwapSlice extends SwapState {
  actions: SwapActions;
}
