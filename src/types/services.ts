import { IPagination } from "./misc";
import { IBillRequest, ITransaction } from "./transactions";
import { INotification } from "./user";

export interface IRewardPoint {
  reward_point_id: string;
  entity_id: string;
  referral_code: string;
  point: number;
  number_of_referrals: number;
  super10_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface IRewardActivityType {
  reward_activity_type: string;
  reward_activity_type_code: number;
  reward_activity_type_description: string;
  points_awarded: number;
  reward_activity_type_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface IRewardActivity {
  entity_id: string;
  reward_activity_type_id: number;
  points_gained: number;
  total_points: number;
  promo_img_url: string;
  referral_activity_id: string;
  created_at: Date;
  updated_at: Date;
  reward_activity_type: IRewardActivityType;
}

export interface IRewardActivityResponse {
  data: IRewardActivity[];
  pagination: IPagination;
}

export interface IFetchRewardsParams {
  limit: number;
  page: number;
}

export interface IResetPinPayload {
  otp: string;
  password: string;
}

export interface IChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export interface ITransactionPinPayload {
  transaction_pin: string;
}

export interface INotificationParams {
  page?: number;
  limit?: number;
  read?: boolean;
  notification_category_id?: number;
}

export interface INotificationResponse {
  pagination_details: IPagination;
  notifications: INotification[];
}

export interface ITxnReportPayload {
  wallet_id: string;
  number_of_days: number;
}

export interface IAnalyticsData {
  credit_amount: number;
  date: string;
  debit_amount: number;
}
export interface ITxnIncomeExpenseResponse {
  total_expense: number;
  total_income: number;
  analytics: IAnalyticsData[];
}

export interface ITxnReportCategoryResponse {
  category_emoji: string;
  percentage: number;
  total_amount: number;
  transaction_category: string;
  transaction_category_id: number;
}

export interface ITransactionParams {
  wallet_id: string;
  transaction_status_id?: number | null;
  transaction_type_id?: number | null;
  transaction_class_id?: string | null;
  payment_method_id?: string | null;
  transaction_report_id?: string | null;
  transaction_category_id?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  transaction_reference?: string | null;
  session_id?: string | null;
  order_number?: string | null;
  page?: number;
  limit?: number;
}

export interface ITxnReportResponse {
  pagination_details: IPagination;
  transaction_reports: ITransaction[];
}

export interface IBillRequestParams {
  status_id?: string | null;
  page?: number;
  limit?: number;
  currency?: string | null;
}

export interface IBillRequestResponse {
  pagination_details: IPagination;
  data: IBillRequest[];
}
