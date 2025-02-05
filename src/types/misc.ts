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

export interface AccountSetupProps {
  selectedStep: AccountSetupStep;
  setSelectedStep: (step: AccountSetupStep | null) => void;
}
