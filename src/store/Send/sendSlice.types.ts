import { ITransactionCategory } from "@/types/transactions";
import { ISearchedUser } from "@/types/user";

export enum SendTypes {
  Raizer = "Raizers",
  BankTransfer = "BankTransfer",
}

type SendTypeKey = keyof typeof SendTypes;

export interface SendState {
  sendType: SendTypeKey | null;
  user: ISearchedUser | null;
  currency: string | null;
  amount: number;
  purpose: string;
  category: ITransactionCategory | null;
  transactionPin: string;
}

export interface AmountAndRemarksPayload {
  amount: number;
  purpose: string;
}

export interface SendActions {
  selectCurrency: (currency: string) => void;
  selectSendOption: (option: SendTypeKey) => void;
  selectUser: (user: ISearchedUser) => void;
  setAmountAndRemark: (payload: AmountAndRemarksPayload) => void;
  selectCategory: (category: ITransactionCategory) => void;
  setTransactionPin: (pin: string) => void;
  reset: () => void;
}

export const initialSendState: SendState = {
  sendType: null,
  user: null,
  currency: "usd",
  amount: 0,
  purpose: "",
  category: null,
  transactionPin: "",
};

export interface SendSlice extends SendState {
  actions: SendActions;
}
