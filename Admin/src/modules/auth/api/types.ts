import type { AppRole } from "@shared"
import type { User, Session } from "@supabase/supabase-js"

export type UserRole = {
  id: number
  user_id: string
  role: AppRole
  created_at: string | null
}

export type AuthState = {
  user: User | null
  roles: AppRole[]
  isAuthenticated: boolean
  isLoading: boolean
}

export type SignInParams = {
  email: string
  password: string
}

export type SignInResponse = {
  user: User
  session: Session
}
