import { AuthAxios, CustomAxiosRequestConfig } from "@/lib/authAxios";
import {
  IAcceptRequestPayload,
  IBeneficiariestResponse,
  IBillRequestParams,
  IBillRequestResponse,
  IExternalBeneficiariesResponse,
  IExternalBeneficiaryPayload,
  IExternalTransferPayload,
  IIntBeneficiariesParams,
  IIntBeneficiariesResponse,
  IIntBeneficiaryPayload,
  IP2pBeneficiariesParams,
  IP2PTransferPayload,
  IP2pTransferResponse,
  IRequestFundsPayload,
  ISendMoneyUsBankPayload,
  ISwapPayload,
  ITransactionCategory,
  ITransactionParams,
  ITxnReportResponse,
  IUsBeneficiariesParams,
  IUsBeneficiariesResponse,
  IUsBeneficiaryPayload,
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

export const AddExternalBeneficiaryApi = async (
  data: IExternalBeneficiaryPayload
) => {
  const response = await AuthAxios.post(
    `/business/transactions/external-beneficiaries/add/`,
    data
  );
  return response?.data;
};

export const FetchNgnAcctDetailsApi = async ({
  account_number,
  bank_code,
}: {
  account_number: string;
  bank_code: string;
}) => {
  const response = await AuthAxios.get(
    `/business/transactions/bank-account-details/nigeria/?account_number=${account_number}&bank_code=${bank_code}`
  );
  return response?.data;
};

export const FetchExternalBeneficiariesApi = async (
  params: IP2pBeneficiariesParams
): Promise<IExternalBeneficiariesResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(
    `/business/transactions/external-beneficiaries/get/`,
    { params: queryParams }
  );
  return response?.data;
};

export async function ExternalNGNDebitApi({
  data,
  pin,
  wallet_id,
}: IExternalTransferPayload): Promise<IP2pTransferResponse> {
  const response = await AuthAxios.post(
    `/business/transactions/naira/send/?wallet_id=${wallet_id}`,
    { data, pin }
  );
  return response.data;
}

export async function GetExchangeRate(currencyCode: string): Promise<{
  buy_rate: number;
  currency: string;
  sell_rate: number;
}> {
  const response = await AuthAxios.get(
    `/business/transactions/swap/exchange-rates/?currency=${currencyCode}`
  );
  return response.data;
}

export async function SellDollarApi(payload: ISwapPayload) {
  const response = await AuthAxios.post(
    "/business/transactions/swap/sell-dollar/",
    payload
  );
  return response.data;
}

export async function BuyDollarApi(payload: ISwapPayload) {
  const response = await AuthAxios.post(
    "/business/transactions/swap/buy-dollar/",
    payload
  );
  return response.data;
}

export const GethInternationalBeneficiaryFormFields = async () => {
  const response = await AuthAxios.get(
    `/business/transactions/remittance/form-fields/`
  );
  return response?.data;
};

export const GetUSBeneficiaryFormFields = async () => {
  const response = await AuthAxios.get(
    `/business/transactions/withdrawal/usd/beneficiaries/form-fields/`
  );
  return response?.data;
};

export const CreateUsBeneficiary = async (payload: IUsBeneficiaryPayload) => {
  const response = await AuthAxios.post(
    `/business/transactions/withdrawal/usd/beneficiaries/?label=${payload.label}&option_type=${payload.optionType}`,
    {
      name: payload.name,
      account: payload.account,
      routing: payload.routing,
      type: payload.type,
    }
  );
  return response?.data;
};

export const FetchUsBeneficiariesApi = async (
  params: IUsBeneficiariesParams
): Promise<IUsBeneficiariesResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(
    `/business/transactions/withdrawal/usd/beneficiaries/`,
    { params: queryParams }
  );
  return response?.data;
};

export const SendMoneyUSBankApi = async (
  data: ISendMoneyUsBankPayload
): Promise<IP2pTransferResponse> => {
  const response = await AuthAxios.post(
    "/business/transactions/withdrawal/usd/insitiate/",
    data
  );
  return response?.data;
};

export const GetIntBeneficiaryFormFields = async () => {
  const response = await AuthAxios.get(
    `/business/transactions/remittance/form-fields/`
  );
  return response?.data;
};

export const FetchIntBeneficiariesApi = async (
  params: IIntBeneficiariesParams
): Promise<IIntBeneficiariesResponse> => {
  const queryParams = Object.fromEntries(
    Object.entries(params).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null
    )
  );
  const response = await AuthAxios.get(
    `/business/transactions/remittance/beneficiaries/`,
    { params: queryParams }
  );
  return response?.data;
};

export const CreateIntBeneficiary = async (payload: IIntBeneficiaryPayload) => {
  const response = await AuthAxios.post(
    `/business/transactions/remittance/beneficiary/?country=${payload.country}&customer_email==${payload.customer_email}`,
    payload.data
  );
  return response?.data;
};
