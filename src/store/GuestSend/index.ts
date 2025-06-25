import { create } from "zustand";
import { initialGuestSendState, GuestSendSlice } from "./guestSendSlice.types";

export const useGuestSendStore = create<GuestSendSlice>((set) => ({
  ...initialGuestSendState,
  actions: {
    setField: (key, value) => set((state) => ({ ...state, [key]: value })),
    setFields: (fields: Partial<GuestSendSlice>) =>
      set((state) => ({ ...state, ...fields })),
    reset: () => set(() => ({ ...initialGuestSendState })),
  },
}));
