import { supabase } from "@shared"
import { salaryApi } from "../salaryApi"
import { SalaryTags } from "../salaryTags"
import type { SalarySetting } from "../../types"

interface Params {
  userId: string
}

const getSalarySettings = salaryApi.injectEndpoints({
  endpoints: (build) => ({
    getSalarySettings: build.query<SalarySetting | null, Params>({
      async queryFn({ userId }) {
        try {
          const { data, error } = await supabase
            .from("salary_settings")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle()

          if (error) {
            throw error
          }

          return { data: data || null }
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Ошибка при получении настроек зарплаты",
              data: error,
            },
          }
        }
      },
      providesTags: (_result, _error, { userId }) => [
        { type: SalaryTags.SETTINGS, id: userId },
      ],
    }),
  }),
  overrideExisting: false,
})

export const { useGetSalarySettingsQuery, useLazyGetSalarySettingsQuery } = getSalarySettings
