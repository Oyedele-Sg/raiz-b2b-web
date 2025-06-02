import { create } from "zustand";
import { initialSwapState, CryptoSwapSlice } from "./CryptoSwapSlice.types";

export const useCryptoSwapStore = create<CryptoSwapSlice>((set) => ({
  ...initialSwapState,
  actions: {
    switchSwapWallet: (swapFromCurrency, swapToCurrency, walletData) => {
      const swapFromWallet =
        walletData?.find(
          (wallet) => wallet.wallet_type.currency === swapFromCurrency
        ) || null;

      const swapToWallet =
        walletData?.find(
          (wallet) => wallet.wallet_type.currency === swapToCurrency
        ) || null;

      set({
        swapFromWallet,
        swapToWallet,
        swapFromCurrency,
        swapToCurrency,
      });
    },
    setAmount: (amount) =>
      set({
        amount,
      }),
    setTransactionPin: (pin) =>
      set({
        transactionPin: pin,
      }),
    setStatus: (status) =>
      set(() => ({
        status,
      })),
    setCoinType: (coinType) =>
      set({
        coinType,
      }),
    reset: () =>
      set({
        ...initialSwapState,
      }),
  },
}));
