import { AuthAxios } from "@/lib/authAxios";
import {
  INotificationParams,
  INotificationResponse,
  ITransactionPinPayload,
  ITxnIncomeExpenseResponse,
  ITxnReportCategoryResponse,
  ITxnReportPayload,
} from "../types/services";

export const FreezeDebitApi = async (data: ITransactionPinPayload) => {
  const response = await AuthAxios.patch(
    "/business/entities/freeze-debits/",
    data
  );
  return response?.data;
};

export const UnFreezeDebitApi = async (data: ITransactionPinPayload) => {
  const response = await AuthAxios.patch(
    "/business/entities/unfreeze-debits/",
    data
  );
  return response?.data;
};

export const CreateUSDWalletApi = async () => {
  const response = await AuthAxios.post("/business/entities/wallets/usd/");
  return response?.data;
};

export const CreateNGNVirtualWalletApi = async () => {
  const response = await AuthAxios.post(
    "/business/entities/virtual-accounts/naira/"
  );
  return response?.data;
};

export const FetchNotificationsApi = async (
  params?: INotificationParams
): Promise<INotificationResponse> => {
  const response = await AuthAxios.get(`/business/entities/notifications/`, {
    params,
  });
  return response?.data;
};

export const MarkAsReadApi = async (notification_id: string) => {
  const response = await AuthAxios.patch(
    `/business/entities/notifications/${notification_id}/`
  );
  return response?.data;
};

export const FetchTransactionReportChartApi = async (
  params: ITxnReportPayload
): Promise<ITxnIncomeExpenseResponse> => {
  const response = await AuthAxios.get(
    `/business/transactions/analytics/transaction-report/chart/`,
    {
      params,
    }
  );
  return response?.data;
};

export const FetchTransactionReportCategoryApi = async (
  params: ITxnReportPayload
): Promise<ITxnReportCategoryResponse[]> => {
  const response = await AuthAxios.get(
    `/business/transactions/analytics/transaction-report/categories/`,
    {
      params,
    }
  );
  return response?.data;
};
