import { FetchExternalBeneficiariesApi } from "@/services/transactions";
import { IP2pBeneficiariesParams } from "@/types/services";
import { useQuery } from "@tanstack/react-query";

interface UseExternalBeneficiariesOptions {
  walletId?: string;
  page?: number;
  limit?: number;
}

export const useExternalBeneficiaries = ({
  walletId,
  page = 1,
  limit = 50,
}: UseExternalBeneficiariesOptions) => {
  const { data: favorites, isLoading: favoritesLoading } = useQuery({
    queryKey: [
      "external-beneficiaries-favorites",
      {
        wallet_id: walletId,
        page,
        limit,
        favourite: true,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IP2pBeneficiariesParams];
      return FetchExternalBeneficiariesApi(params);
    },
    enabled: !!walletId,
  });
  // Query for all beneficiaries (recents)
  const { data: recents, isLoading: recentsLoading } = useQuery({
    queryKey: [
      "external-beneficiaries-recents",
      {
        wallet_id: walletId,
        page,
        limit,
        favourite: true,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IP2pBeneficiariesParams];
      return FetchExternalBeneficiariesApi(params);
    },
    enabled: !!walletId,
  });

  const favoriteAccounts =
    favorites?.data.map((entity) => entity.external_account) || [];
  const recentAccounts =
    recents?.data.map((entity) => entity.external_account) || [];

  return {
    favourites: favoriteAccounts,
    recents: recentAccounts,
    isLoading: favoritesLoading || recentsLoading,
  };
};
