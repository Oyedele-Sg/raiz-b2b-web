import { AuthAxios, CustomAxiosRequestConfig } from "@/lib/authAxios";
import {
  IAcceptRequestPayload,
  IBeneficiariestResponse,
  IBillRequestParams,
  IBillRequestResponse,
  IP2pBeneficiariesParams,
  IP2PTransferPayload,
  IP2pTransferResponse,
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
    { params: queryParams, silent: true } as CustomAxiosRequestConfig
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
}: IAcceptRequestPayload): Promise<IP2pTransferResponse> => {
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

export async function P2PDebitApi({
  wallet_id,
  payload,
}: IP2PTransferPayload): Promise<IP2pTransferResponse> {
  const response = await AuthAxios.post(
    `/business/transactions/debits/p2p/?wallet_id=${wallet_id}`,
    payload
  );
  return response.data;
}

export const GetTransactionFeeApi = async (
  amount: number,
  transfer_type: "NGN" | "USD" | "WIRE"
): Promise<number> => {
  const response = await AuthAxios.get(
    `/business/transactions/charges/get/?amount=${amount}&transfer_type=${transfer_type}`
  );
  return response?.data;
};

export const FetchP2PBeneficiariesApi = async (
  params: IP2pBeneficiariesParams
): Promise<IBeneficiariestResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(
    `/business/transactions/p2p/beneficiaries/get/`,
    { params: queryParams }
  );
  return response?.data;
};

export const AddP2PBeneficiaryApi = async (
  wallet_id: string,
  beneficiary_entity_id: string
) => {
  const response = await AuthAxios.post(
    `/business/transactions/p2p/beneficiaries/add/?wallet_id=${wallet_id}&beneficiary_entity_id=${beneficiary_entity_id}`
  );
  return response?.data;
};
