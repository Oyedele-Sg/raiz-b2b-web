import { FetchUserApi } from "@/services/user";
import { useUserStore } from "@/store/useUserStore";
import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

export const useUser = () => {
  const { user, setUser, clearUser, updateUser } = useUserStore();

  const {
    data: userData,
    isLoading: isFetching,
    error: fetchError,
    isSuccess,
    isError,
  } = useQuery<IUser, AxiosError>({
    queryKey: ["user"],
    queryFn: FetchUserApi,
    retry: 2,
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
  };
};

export type UseUserReturn = ReturnType<typeof useUser>;
