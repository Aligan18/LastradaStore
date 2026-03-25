import { Methods, Tables, type AdapterParams, type Pagination } from "@shared"
import { salaryApi } from "../salaryApi"
import { SalaryTags } from "../salaryTags"

interface Params {
  userId?: string
  pagination?: Pagination
}

interface SalaryPaymentWithUser {
  id: number
  user_id: string
  payment_date: string
  amount: number
  period_from: string
  period_to: string
  realization_count: number
  calculation_type: string
  calculation_value: number | null
  note: string | null
  created_at: string | null
  user_roles?: {
    user_name: string | null
    role: string
  }
}

const getSalaryPayments = salaryApi.injectEndpoints({
  endpoints: (build) => ({
    getSalaryPayments: build.query<
      { data: SalaryPaymentWithUser[]; count: number },
      Params
    >({
      query: ({ userId, pagination }): AdapterParams => ({
        table: Tables.SALARY_PAYMENTS,
        method: Methods.GET_ALL,
        params: {
          select: "*, user_roles(user_name, role)",
          pagination,
          filter: (query) => {
            let q = query.order("payment_date", { ascending: false })
            if (userId) {
              q = q.eq("user_id", userId)
            }
            return q
          },
        },
        extraOptions: { errorMessage: "Ошибка при получении истории выплат" },
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.map((payment) => ({
              type: SalaryTags.PAYMENTS as const,
              id: payment.id,
            })),
            SalaryTags.PAYMENTS,
          ]
          : [SalaryTags.PAYMENTS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetSalaryPaymentsQuery } = getSalaryPayments
