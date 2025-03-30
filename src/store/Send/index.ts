import { create } from "zustand";
import { initialSendState, SendSlice } from "./sendSlice.types";
import { passwordHash } from "@/utils/helpers";

export const useSendStore = create<SendSlice>((set) => ({
  ...initialSendState,
  actions: {
    selectCurrency: (currency) =>
      set(() => ({
        currency,
      })),
    selectUSDSendOption: (option) =>
      set(() => ({
        usdSendType: option,
      })),
    selectNGNSendOption: (option) =>
      set(() => ({
        ngnSendType: option,
      })),
    selectUser: (user) =>
      set(() => ({
        user,
      })),
    selectExternalUser: (user) =>
      set(() => ({
        externalUser: user,
      })),
    selectUsdBeneficiary: (user) =>
      set(() => ({
        usdBeneficiary: user,
      })),
    selectIntBeneficiary: (user) =>
      set(() => ({
        intBeneficiary: user,
      })),
    setAmountAndRemark: (payload) =>
      set(() => ({
        amount: payload.amount,
        purpose: payload.purpose,
      })),
    selectCategory: (category) =>
      set(() => ({
        category,
      })),
    setTransactionPin: (pin) =>
      set(() => ({
        transactionPin: passwordHash(pin),
      })),
    setStatus: (status) =>
      set(() => ({
        status,
      })),
    setTransactionDetail: (detail) =>
      set((state) => ({
        ...state,
        transactionDetail: detail,
      })),
    reset: (currency) =>
      set(() => ({
        ...initialSendState,
        currency,
      })),
  },
}));
