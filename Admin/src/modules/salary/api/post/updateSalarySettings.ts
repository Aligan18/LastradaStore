import { supabase } from "@shared"
import { salaryApi } from "../salaryApi"
import { SalaryTags } from "../salaryTags"
import type { SalarySettingFormData, SalarySetting } from "../../types"

const updateSalarySettings = salaryApi.injectEndpoints({
  endpoints: (build) => ({
    updateSalarySettings: build.mutation<SalarySetting, SalarySettingFormData>({
      async queryFn(data) {
        try {
          const { data: result, error } = await supabase
            .from("salary_settings")
            .upsert(
              {
                user_id: data.user_id,
                calculation_type: data.calculation_type,
                fixed_amount: data.calculation_type === "fixed" ? data.fixed_amount : null,
                percentage: data.calculation_type === "percentage" ? data.percentage : null,
                is_active: data.is_active,
                updated_at: new Date().toISOString(),
                only_own_orders: data.only_own_orders,
              },
              { onConflict: "user_id" },
            )
            .select()
            .single()

          if (error) {
            throw error
          }

          return { data: result }
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Ошибка при обновлении настроек зарплаты",
              data: error,
            },
          }
        }
      },
      invalidatesTags: (_result, _error, { user_id }) => [
        { type: SalaryTags.SETTINGS, id: user_id },
        SalaryTags.USERS_WITH_SALARY,
        SalaryTags.PENDING_SALARY,
      ],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateSalarySettingsMutation } = updateSalarySettings
