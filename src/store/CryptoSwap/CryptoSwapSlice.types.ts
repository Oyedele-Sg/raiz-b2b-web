/* eslint-disable @typescript-eslint/no-explicit-any */
import { sbcType } from "@/app/(dashboard)/_components/crypto/send/CryptoSend";
import { CRYPTO_SWAP_ACCOUNT_CURRENCIES } from "@/constants/misc";
import { PaymentStatusType } from "@/types/transactions";
import { IWallet } from "@/types/user";

export type CurrencyTypeKey = keyof typeof CRYPTO_SWAP_ACCOUNT_CURRENCIES;

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
  coinType: sbcType | null;
}

export interface SwapActions {
  switchSwapWallet: (
    swapFromCurrency: CurrencyTypeKey,
    swapToCurrency: CurrencyTypeKey,
    walletData?: IWallet[]
  ) => void;
  setAmount: (amount: string) => void;
  setTransactionPin: (pin: string) => void;
  setCoinType: (coinType: sbcType) => void;
  setStatus: (status: PaymentStatusType | null) => void;
  reset: () => void;
}

export const initialSwapState: SwapState = {
  swapFromWallet: null,
  swapToWallet: null,
  swapFromCurrency: CRYPTO_SWAP_ACCOUNT_CURRENCIES.USD.name,
  swapToCurrency: CRYPTO_SWAP_ACCOUNT_CURRENCIES.SBC.name,
  amount: "",
  transactionPin: "",
  walletData: undefined,
  status: null,
  coinType: null,
};

export interface CryptoSwapSlice extends SwapState {
  actions: SwapActions;
}
