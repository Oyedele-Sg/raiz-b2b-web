import { FetchUserApi } from "@/services/user";
import { useUserStore } from "@/store/useUserStore";
import { IUser } from "@/types/user";
// import { GetItemFromCookie } from "@/utils/CookiesFunc";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useUser = () => {
  const { user, setUser, clearUser, updateUser } = useUserStore();
  // const token = GetItemFromCookie("access_token");

  const {
    data: userData,
    isLoading: isFetching,
    error: fetchError,
    isSuccess,
    isError,
    refetch,
  } = useQuery<IUser, AxiosError>({
    queryKey: ["user"],
    queryFn: FetchUserApi,
    // enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess && userData) {
      setUser(userData);
    }
  }, [isSuccess, userData, setUser]);

  useEffect(() => {
    if (isError && fetchError) {
      useUserStore.setState({
        error: fetchError instanceof Error ? fetchError.message : "Fetch error",
      });
    }
  }, [isError, fetchError]);

  return {
    user: user || userData,
    isLoading: isFetching,
    error: fetchError,
    setUser,
    updateUser,
    clearUser,
    refetch,
  };
};

export type UseUserReturn = ReturnType<typeof useUser>;
