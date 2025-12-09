import { UserRole } from "@/lib/auth.utils"

export interface UserInfo {
  id: string
  email: string
  name: string
  role: UserRole
  phone: string
  profile?: string
  nid?: string
  status: UserStatus
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED"

export interface SendResponse<T> {
  success: boolean,
  message: string
  data: T
}