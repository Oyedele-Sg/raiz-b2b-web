import { AuthAxios } from "@/lib/authAxios";
import {
  IFetchRewardsParams,
  IRewardActivityResponse,
  IRewardPoint,
  IUserSearchParams,
  IUserSearchResponse,
} from "@/types/services";
import { IUser } from "@/types/user";

export const FetchUserApi = async (): Promise<IUser> => {
  const response = await AuthAxios.get("/business/account_user/me");
  return response?.data;
};

export const UploadProfilePicture = async (image_url: string) => {
  const response = await AuthAxios.patch(
    "/business/account_user/business-image/",
    null,
    {
      params: {
        image_url,
      },
    }
  );
  return response?.data;
};

export const FetchUserRewardsApi = async (): Promise<IRewardPoint> => {
  const response = await AuthAxios.get("/business/entities/rewards/points/");
  return response?.data;
};

export const FetchUserRewardsActivitiesApi = async ({
  limit,
  page,
}: IFetchRewardsParams): Promise<IRewardActivityResponse> => {
  const response = await AuthAxios.get(
    `/business/entities/rewards/activities/?limit=${limit}&page=${page}`
  );
  return response?.data;
};

export const SearchUsersApi = async (): Promise<IUser> => {
  const response = await AuthAxios.get("/business/account_user/search/all");
  return response?.data;
};

export const updateUsernameApi = async (username: string) => {
  const response = await AuthAxios.patch(
    "/business/account_user/username/",
    null,
    {
      params: {
        username,
      },
    }
  );
  return response?.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PersonaVerificationApi = async (inquiry_id: string) => {
  const response = await AuthAxios.post(
    `/business/account_user/verifications/persona/?inquiry_id=${inquiry_id}`,
    null
  );
  return response?.data;
};

export const SearchAllUsersApi = async (
  params: IUserSearchParams
): Promise<IUserSearchResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(`/business/account_user/search/all/`, {
    params: queryParams,
  });
  return response?.data;
};
