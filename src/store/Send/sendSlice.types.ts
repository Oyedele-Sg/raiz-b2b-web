export interface User {
  name: string;
  id: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface SendState {
  sendType: "raizers" | "bankTransfer" | null;
  user: User | null;
  currency: "usd" | "ngn" | null;
  amount: number;
  purpose: string;
  category: Category | null;
  transactionPin: string;
}

export interface AmountAndRemarksPayload {
  amount: number;
  purpose: string;
}

export interface SendActions {
  selectSendOption: (option: string) => void;
  selectUser: (user: User) => void;
  setAmountAndRemark: (payload: AmountAndRemarksPayload) => void;
  selectCategory: (category: Category) => void;
  setTransactionPin: (pin: string) => void;
  reset: () => void;
}

export const initialSendState: SendState = {
  sendType: null,
  user: null,
  currency: null,
  amount: 0,
  purpose: "",
  category: null,
  transactionPin: "",
};

export interface SendSlice extends SendState, SendActions {}
