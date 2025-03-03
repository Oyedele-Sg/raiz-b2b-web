import { ACCOUNT_CURRENCIES } from "@/constants/misc";
import { ReactNode } from "react";

export interface ISidebarMenuItem {
  name: string;
  link: string;
  icon: (isActive: boolean) => React.ReactNode;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  // username: string;
  // phone_number: string;
  country_id: string;
  country_name?: string;
  referral_code?: string;
  otp: string;
  // useCases?: number[];
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface AccountSetupStep {
  title:
    | "Account created"
    | "Verify your phone"
    | "Add a residential Address"
    | "Secure your account";
  subtitle: string;
  status: "completed" | "in-complete";
  icon: ReactNode;
}

export type AccountCurrencyType =
  (typeof ACCOUNT_CURRENCIES)[keyof typeof ACCOUNT_CURRENCIES];

export interface AccountSetupProps {
  selectedStep: AccountSetupStep;
  setSelectedStep: (step: AccountSetupStep | null) => void;
}

export interface NotificationItemProps {
  notification_title: string;
  notification_body: string;
  read: boolean;
  notification_category_id: number;
  created_at: Date;
  updated_at: Date;
  notification_category: {
    notification_category_name: string;
    notification_category_description: string;
    notification_category_code: number;
    notification_category_id: number;
    created_at: Date;
    updated_at: Date;
  };
}

export type IUsdSendOptions =
  | "to Raizer"
  | "bank transfer"
  | "to debit card"
  | "to zelle"
  | "to cashapp";

export interface ICountry {
  country_name: string;
  country_code: string;
  currency: string;
  is_supported: boolean;
  country_flag: string;
  area_code: string;
  country_id: string;
  created_at: string;
  updated_at: string;
}
