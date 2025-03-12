import { IPagination } from "./misc";
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
