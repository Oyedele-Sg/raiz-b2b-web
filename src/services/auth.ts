import { PublicAxios } from "@/lib/publicAxios";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  country_id: string;
  referral_code: string;
}

export async function LoginApi(data: ILoginPayload) {
  const response = await PublicAxios.post("/business/auth/login/", data);
  return response.data;
}

export async function CountriesApi() {
  const response = await PublicAxios.get("/countries");
  return response.data;
}

export const SignupApi = async (data: IRegisterPayload) => {
  const response = await PublicAxios.post("/business/auth/sign-up/", data);
  return response?.data;
};

export const SignupVerifyOtpApi = async (data: { otp: string }) => {
  const response = await PublicAxios.post("/business/auth/verify-otp/", data, {
    params: {
      medium: "email",
    },
  });
  return response?.data;
};

export const ResendSignupOtpApi = async (data: { email: string }) => {
  const response = await PublicAxios.post("/business/auth/refresh-otp/", data, {
    params: {
      medium: "email",
    },
  });
  return response?.data;
};
