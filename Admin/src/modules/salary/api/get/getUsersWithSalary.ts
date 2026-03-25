import { Methods, Tables, type AdapterParams, type ResponseAll } from "@shared"
import { salaryApi } from "../salaryApi"
import { SalaryTags } from "../salaryTags"
import type { UserWithSalaryInfo } from "../../types"

interface UserRole {
  user_id: string
  user_name: string | null
  role: "manager" | "packer"
  salary_settings: Array<{
    id: number
    calculation_type: string
    fixed_amount: number | null
    percentage: number | null
    is_active: boolean | null
  }> | null
}

const getUsersWithSalary = salaryApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersWithSalary: build.query<UserWithSalaryInfo[], void>({
      query: (): AdapterParams => ({
        table: Tables.USER_ROLES,
        method: Methods.GET_ALL,
        params: {
          select: "user_id, user_name, role, salary_settings(*)",
        },
        extraOptions: { errorMessage: "Ошибка при получении списка пользователей" },
      }),
      transformResponse: (response: ResponseAll<UserRole[]>) => {
        return response.data.map((user) => ({
          user_id: user.user_id,
          user_name: user.user_name,
          role: user.role,
          has_settings: !!user.salary_settings && user.salary_settings.length > 0,
          is_active: user.salary_settings?.[0]?.is_active ?? false,
          settings: user.salary_settings?.[0]
            ? {
              id: user.salary_settings[0].id,
              user_id: user.user_id,
              calculation_type: user.salary_settings[0].calculation_type,
              fixed_amount: user.salary_settings[0].fixed_amount,
              percentage: user.salary_settings[0].percentage,
              is_active: user.salary_settings[0].is_active ?? false,
              only_own_orders: false,
              created_at: null,
              updated_at: null,
            }
            : null,
        }))
      },
      providesTags: [SalaryTags.USERS_WITH_SALARY, SalaryTags.SETTINGS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetUsersWithSalaryQuery } = getUsersWithSalary
