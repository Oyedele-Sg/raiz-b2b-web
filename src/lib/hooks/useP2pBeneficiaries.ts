// useP2PBeneficiaries.ts
import { useQuery } from "@tanstack/react-query";
import { FetchP2PBeneficiariesApi } from "@/services/transactions";
import { IP2pBeneficiariesParams } from "@/types/services";

interface UseP2PBeneficiariesOptions {
  walletId?: string;
  page?: number;
  limit?: number;
}

export const useP2PBeneficiaries = ({
  walletId,
  page = 1,
  limit = 50,
}: UseP2PBeneficiariesOptions = {}) => {
  const { data: favorites, isLoading: favoritesLoading } = useQuery({
    queryKey: [
      "p2p-beneficiaries-favorites",
      {
        wallet_id: walletId,
        page,
        limit,
        favourite: true,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IP2pBeneficiariesParams];
      return FetchP2PBeneficiariesApi(params);
    },
    enabled: !!walletId,
  });

  // Query for all beneficiaries (recents)
  const { data: recents, isLoading: recentsLoading } = useQuery({
    queryKey: [
      "p2p-beneficiaries-recents",
      {
        wallet_id: walletId,
        page,
        limit,
      },
    ],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, IP2pBeneficiariesParams];
      return FetchP2PBeneficiariesApi(params);
    },
    enabled: !!walletId,
  });

  return {
    favourites: favorites?.results || [],
    recents: recents?.results || [],
    isLoading: favoritesLoading || recentsLoading,
  };
};
