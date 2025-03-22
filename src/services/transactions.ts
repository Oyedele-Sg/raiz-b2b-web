import { AuthAxios } from "@/lib/authAxios";
import {
  IAcceptRequestPayload,
  IBillRequestParams,
  IBillRequestResponse,
  IRequestFundsPayload,
  ITransactionCategory,
  ITransactionParams,
  ITxnReportResponse,
} from "@/types/services";

export const FetchTransactionReportApi = async (
  params: ITransactionParams
): Promise<ITxnReportResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(
    `/business/transactions/transaction-reports/`,
    { params: queryParams }
  );
  return response?.data;
};

export const FetchBillRequestApi = async (
  params: IBillRequestParams
): Promise<IBillRequestResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(
    `/business/transactions/requests/funds/received/`,
    { params: queryParams }
  );
  return response?.data;
};

export const FetchTransactionCategoriesApi = async (): Promise<
  ITransactionCategory[]
> => {
  const response = await AuthAxios.get("/transactions/transaction-categories/");
  return response?.data;
};

export const AcceptRequestApi = async ({
  params,
  transaction_pin,
}: IAcceptRequestPayload) => {
  const response = await AuthAxios.patch(
    `/business/transactions/requests/funds/${params?.request_id}/accept/`,
    { transaction_pin },
    {
      params,
    }
  );
  return response?.data;
};

export const RejectRequestApi = async (request_id: string) => {
  const response = await AuthAxios.patch(
    `/business/transactions/requests/funds/${request_id}/decline/`,
    null,
    {
      params: {
        request_id,
      },
    }
  );
  return response?.data;
};

export const RequestFundsApi = async (
  wallet_id: string,
  data: IRequestFundsPayload
) => {
  const response = await AuthAxios.post(
    `/business/transactions/requests/funds/`,
    data,
    {
      params: {
        wallet_id,
      },
    }
  );
  return response?.data;
};

export const FetchSentRequestApi = async (
  params: IBillRequestParams
): Promise<IBillRequestResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(
    `/business/transactions/requests/funds/sent/`,
    { params: queryParams }
  );
  return response?.data;
};
