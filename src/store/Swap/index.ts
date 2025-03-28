import { create } from "zustand";
import { initialSwapState, SwapSlice } from "./swapSlice.types";

export const useSwapStore = create<SwapSlice>((set) => ({
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
    reset: () =>
      set({
        ...initialSwapState,
      }),
  },
}));
