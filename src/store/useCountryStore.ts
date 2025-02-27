import { PublicAxios } from "@/lib/publicAxios";
import { ICountry } from "@/types/misc";
import { create } from "zustand";

interface CountryStore {
  countries: ICountry[];
  fetchCountries: (search?: string) => Promise<void>;
}

const useCountryStore = create<CountryStore>((set) => ({
  countries: [],
  fetchCountries: async (search = "") => {
    const cachedData = localStorage.getItem("countries");

    if (cachedData && !search) {
      set({ countries: JSON.parse(cachedData) });
      return;
    }

    const response = await PublicAxios.get("/countries/", {
      params: search ? { search } : {},
    });

    const data = response?.data;

    if (!search) {
      localStorage.setItem("countries", JSON.stringify(data));
    }
    set({ countries: data });
  },
}));

export default useCountryStore;
