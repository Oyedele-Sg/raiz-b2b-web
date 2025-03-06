import { AuthAxios } from "@/lib/authAxios";
import { IUser } from "@/types/user";

export const FetchUserApi = async (): Promise<IUser> => {
  const response = await AuthAxios.get("/business/account_user/me/");
  return response?.data;
};

export const UploadProfilePicture = async ({
  image_url,
}: {
  image_url: string;
}) => {
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

export const FetchUserRewardsApi = async (): Promise<IUser> => {
  const response = await AuthAxios.get("/business/entities/rewards/points/");
  return response?.data;
};
