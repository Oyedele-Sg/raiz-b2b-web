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
  username: string;
  phone_number: string;
  country_id: string;
  referral_code?: string;
  otp: string;
  useCases?: number[];
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
