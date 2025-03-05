import { IEntityAddress } from "./misc";

export interface IEntityType {
  entity_type_name: string;
  entity_type_code: number;
  entity_type_description: string;
  entity_type_id: number;
}

export interface IEntity {
  entity_type_id: number;
  country_id: string;
  is_entity_blocked: boolean;
  is_entity_frozen: boolean;
  is_entity_closed: boolean;
  is_entity_blacklisted: boolean;
  onboarding_status: string;
  kyt_id: string;
  entity_id: string;
  entity_type: IEntityType;
  created_at: string;
  updated_at: string;
  entity_address: IEntityAddress[];
}

export interface IBusinessVerification {
  is_stakeholders_verified: boolean;
  is_phone_verified: boolean;
  is_address_verified: boolean;
  is_document_verified: boolean;
  verification_status: string;
  business_account_id: string;
  business_verification_id: string;
}

export interface IBusinessAccount {
  business_name: string;
  business_email: string;
  business_phone_number: string;
  username: string;
  entity_id: string;
  business_type: string;
  business_description: string;
  qr_code: string;
  business_image: string;
  business_account_id: string;
  entity: IEntity;
  business_verifications: IBusinessVerification[];
  wallets: [];
  virtual_cards: [];
}

export interface IUser {
  first_name: string;
  last_name: string;
  business_account_id: string;
  authentication_id: string;
  is_primary: boolean;
  business_account_user_id: string;
  selfie_image: string;
  is_verified: boolean;
  has_password: boolean;
  email: string;
  business_account: IBusinessAccount;
}
