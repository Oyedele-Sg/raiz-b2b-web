import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";
import { encryptData, generateNonce } from "./headerEncryption";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ErrorResponseData {
  message?: string;
  [key: string]: unknown;
}

interface CustomAxiosError extends AxiosError {
  response?: AxiosResponse<ErrorResponseData>;
}

const handleResponse = (response: AxiosResponse) => response;

const handleError = async (error: CustomAxiosError) => {
  console.error(JSON.stringify(error, null, 2));
  const errorMessage = error.response?.data?.message || "An Error Occurred";
  toast.error(errorMessage);
  return Promise.reject(error.response);
};

export const AuthAxios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

AuthAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    // Generate nonce and signature for every request
    const nonceStr = generateNonce();
    const signature = encryptData(nonceStr);

    config.headers["nonce-str"] = nonceStr;
    config.headers["signature"] = signature;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AuthAxios.interceptors.response.use(handleResponse, handleError);
