import type { Database } from "@shared"

export type SalaryCalculationType = "fixed" | "percentage"
export type SalaryRole = Database["public"]["Enums"]["app_role"]

export type SalarySetting = Database["public"]["Tables"]["salary_settings"]["Row"]
export type SalaryPayment = Database["public"]["Tables"]["salary_payments"]["Row"]
export type RealizationRoleSalary = Database["public"]["Tables"]["realization_role_salaries"]["Row"]

export interface SalarySettingFormData {
  user_id: string
  calculation_type: SalaryCalculationType
  fixed_amount: number | null
  percentage: number | null
  is_active: boolean
  only_own_orders: boolean
}

export interface PendingRealization {
  id: number
  realization_date: string
  client_name: string | null
  total_earned: number
  salary_amount: number
}

export interface SalaryCalculationResult {
  user_id: string
  user_name: string | null
  role: SalaryRole
  total_amount: number
  realization_count: number
  pending_realizations: PendingRealization[]
  settings: SalarySetting | null
  total_earned: number
}

export interface ProcessSalaryPaymentParams {
  user_id: string
  role: SalaryRole
  amount: number
  realization_ids: number[]
  period_from: string
  period_to: string
  note?: string
}

export interface UserWithSalaryInfo {
  user_id: string
  user_name: string | null
  role: SalaryRole
  has_settings: boolean
  is_active: boolean
  settings: SalarySetting | null
}
