import { useCurrencyStore } from "@/store/useCurrencyStore";
import { IUser } from "@/types/user";
import { findWalletByCurrency } from "@/utils/helpers";

export const useCurrentWallet = (user: IUser | undefined) => {
  const { selectedCurrency, selectedWallet } = useCurrencyStore();

  const NGNAcct = findWalletByCurrency(user, "NGN");
  const USDAcct = findWalletByCurrency(user, "USD");

  const getCurrentWallet = () => {
    if (selectedWallet) return selectedWallet;
    if (selectedCurrency.name === "NGN") return NGNAcct;
    if (selectedCurrency.name === "USD") return USDAcct;
    return null;
  };

  return getCurrentWallet();
};
