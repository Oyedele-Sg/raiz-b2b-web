import { AuthAxios } from "@/lib/authAxios";
import { IBank } from "@/types/misc";
import { create } from "zustand";

interface BankStore {
  ngnBanks: IBank[];
  fetchBanks: () => Promise<void>;
}

const useBanksStore = create<BankStore>((set) => ({
  ngnBanks: [],
  fetchBanks: async () => {
    const cachedData = localStorage.getItem("ngn-banks");

    if (cachedData) {
      set({ ngnBanks: JSON.parse(cachedData) });
      return;
    }

    const response = await AuthAxios.get(
      `/business/transactions/banks/nigeria/`
    );

    const data = response?.data?.banks;

    localStorage.setItem("ngnBanks", JSON.stringify(data));
    set({ ngnBanks: data });
  },
}));

export default useBanksStore;
