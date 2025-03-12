import { AuthAxios } from "@/lib/authAxios";
import { ITransactionPinPayload } from "../types/services";

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
