import { AuthAxios } from "@/lib/authAxios";
import { ICountry } from "@/types/misc";

export const FetchCountriesWithIdApi = async (
  country_id: string
): Promise<ICountry> => {
  const response = await AuthAxios.get(`/countries/${country_id}/`);
  return response?.data;
};
