import { UserRole } from "@/lib/auth.utils";

export interface UserInfo {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone: string;
  profile?: string;
  nid?: string;
  status: UserStatus;
  address?: AddressInfo;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED";

export interface SendResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AddressInfo {
  id?: string;
  city: string;
  country: string;
  address_detail: string;
  createdAt?: string;
  updatedAt?: string;
}
