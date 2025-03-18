export interface ITransactionType {
  transaction_type: string;
  transaction_type_description: string;
  transaction_type_code: number;
  transaction_type_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ITransactionStatus {
  transaction_status: string;
  transaction_status_description: string;
  transaction_status_code: number;
  transaction_status_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ITransactionClass {
  transaction_class: string;
  transaction_class_description: string;
  transaction_class_code: number;
  transaction_class_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IPaymentMethod {
  payment_method: string;
  payment_method_description: string;
  payment_method_code: number;
  payment_method_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ITransactionCategory {
  transaction_category: string;
  transaction_category_code: number;
  transaction_category_description: string;
  category_emoji: string;
  transaction_category_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ITransaction {
  wallet_id: string;
  transaction_type_id: number;
  transaction_class_id: number;
  payment_method_id: number;
  transaction_status_id: number;
  transaction_category_id: number;
  transaction_amount: number;
  currency: string;
  transaction_remarks: string;
  transaction_reference: string;
  transaction_date_time: string;
  fee_amount: number;
  vat_amount: number;
  account_balance: number;
  transaction_description: string;
  third_party_name: string;
  third_party_profile_image_url: string | null;
  session_id: string;
  order_number: string | null;
  source_account_number: string | null;
  source_bank_name: string | null;
  beneficiary_account_number: string | null;
  beneficiary_bank: string | null;
  beneficiary_bank_name: string | null;
  transaction_report_id: string;
  created_at: Date;
  updated_at: Date;
  transaction_type: ITransactionType;
  transaction_status: ITransactionStatus;
  transaction_class: ITransactionClass;
  payment_method: IPaymentMethod;
  transaction_category: ITransactionCategory;
}
