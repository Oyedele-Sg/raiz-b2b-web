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
