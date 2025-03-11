import { AuthAxios } from "@/lib/authAxios";
import { ITransactionPinPayload } from "./services";

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
