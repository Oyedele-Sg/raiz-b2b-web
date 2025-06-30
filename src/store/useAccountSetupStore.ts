import { create } from "zustand";
import { AccountSetupStep } from "@/types/misc";

interface AccountSetupState {
  selectedStep: AccountSetupStep | null;
  setSelectedStep: (step: AccountSetupStep | null) => void;
}

export const useAccountSetupStore = create<AccountSetupState>((set) => ({
  selectedStep: null,
  setSelectedStep: (step) => set({ selectedStep: step }),
}));
