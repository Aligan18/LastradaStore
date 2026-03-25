export { salaryApi } from "./salaryApi"
export { SalaryTags } from "./salaryTags"

// GET endpoints
export { useGetUsersWithSalaryQuery } from "./get/getUsersWithSalary"
export { useGetSalarySettingsQuery, useLazyGetSalarySettingsQuery } from "./get/getSalarySettings"
export { useGetPendingSalaryQuery, useLazyGetPendingSalaryQuery } from "./get/getPendingSalary"
export { useGetSalaryPaymentsQuery } from "./get/getSalaryPayments"

// POST endpoints
export { useUpdateSalarySettingsMutation } from "./post/updateSalarySettings"
export { useProcessSalaryPaymentMutation } from "./post/processSalaryPayment"
