export {
  salaryApi,
  useGetSalaryPaymentsQuery,
  useGetPendingSalaryQuery,
  useGetSalarySettingsQuery,
  useGetUsersWithSalaryQuery,
  useLazyGetPendingSalaryQuery,
  useLazyGetSalarySettingsQuery,
  useProcessSalaryPaymentMutation,
  useUpdateSalarySettingsMutation,
} from "./api"
export type {
  PendingRealization,
  ProcessSalaryPaymentParams,
  SalaryCalculationResult,
  SalaryCalculationType,
  SalaryPayment,
  SalarySetting,
  SalarySettingFormData,
  UserWithSalaryInfo,
} from "./types"

export {
  PendingRealizationsTable,
  SalaryCalculationCard,
  SalaryPaymentModal,
  SalaryPaymentsHistory,
  SalarySettingsForm,
} from "./ui"
