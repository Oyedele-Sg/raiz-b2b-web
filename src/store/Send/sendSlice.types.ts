import { ACCOUNT_CURRENCIES } from "@/constants/misc";
import { IUsdSendOptions } from "@/types/misc";
import { IP2pTransferResponse } from "@/types/services";
import { ITransactionCategory, PaymentStatusType } from "@/types/transactions";
import { ISearchedUser } from "@/types/user";

type CurrencyTypeKey = keyof typeof ACCOUNT_CURRENCIES;

export interface SendState {
  sendType: IUsdSendOptions | null;
  user: ISearchedUser | null;
  currency: CurrencyTypeKey | null;
  amount: string;
  purpose: string;
  category: ITransactionCategory | null;
  transactionPin: string;
  status: PaymentStatusType | null;
  transactionDetail: IP2pTransferResponse | null;
}

export interface AmountAndRemarksPayload {
  amount: string;
  purpose: string;
}

export interface SendActions {
  selectCurrency: (currency: CurrencyTypeKey) => void;
  selectSendOption: (option: IUsdSendOptions | null) => void;
  selectUser: (user: ISearchedUser | null) => void;
  setAmountAndRemark: (payload: AmountAndRemarksPayload) => void;
  selectCategory: (category: ITransactionCategory | null) => void;
  setTransactionPin: (pin: string) => void;
  setStatus: (status: PaymentStatusType | null) => void;
  setTransactionDetail: (detail: IP2pTransferResponse) => void;
  reset: () => void;
}

export const initialSendState: SendState = {
  sendType: null,
  user: null,
  currency: "USD",
  amount: "",
  purpose: "",
  category: null,
  transactionPin: "",
  status: null,
  transactionDetail: null,
};

export interface SendSlice extends SendState {
  actions: SendActions;
}
