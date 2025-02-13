import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { toast } from "sonner";

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
  console.log(JSON.stringify(error, null, 2));
  const errorMessage = error.response?.data?.message || "An Error Occurred";
  toast.error(errorMessage);
  return Promise.reject(error.response);
};

export const PublicAxios = axios.create({
  baseURL: BASE_URL,
});

const addNetworkCheckInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (requestConfig) => {
      try {
        const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();
        requestConfig.cancelToken = cancelTokenSource.token;
        return requestConfig;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    (error: AxiosError) => Promise.reject(error)
  );
};

addNetworkCheckInterceptor(PublicAxios);

PublicAxios.interceptors.response.use(handleResponse, handleError);
