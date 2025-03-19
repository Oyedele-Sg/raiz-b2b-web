import { AuthAxios } from "@/lib/authAxios";
import {
  IBillRequestParams,
  IBillRequestResponse,
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
