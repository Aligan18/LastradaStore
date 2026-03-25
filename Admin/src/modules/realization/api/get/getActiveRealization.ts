import { supabase } from "@shared"
import { realizationApi } from "../realizationApi"
import { RealizationStatus, type Realization } from "../types"
import { RealizationTags } from "../realizationTags"
import type { Pagination } from "@shared"

type Params = { pagination: Pagination; managerId: string }

const getActiveRealization = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveRealization: build.query<
      { data: Realization[]; count: number | null },
      Params
    >({
      async queryFn({ pagination, managerId }) {
        try {
          // Получаем ID заказов, где пользователь является менеджером
          const { data: roleSalaries } = await supabase
            .from("realization_role_salaries")
            .select("realization_id")
            .eq("user_id", managerId)
            .eq("role", "manager")

          const realizationIds = roleSalaries?.map((rs) => rs.realization_id) || []

          if (realizationIds.length === 0) {
            return { data: { data: [], count: 0 } }
          }

          // Получаем активные заказы с пагинацией
          let query = supabase
            .from("realizations")
            .select("*", { count: "exact" })
            .eq("status", RealizationStatus.ACTIVE)
            .in("id", realizationIds)
            .order("realization_date", { ascending: false })

          if (pagination) {
            const { current = 1, pageSize = 10 } = pagination
            const from = (current - 1) * pageSize
            const to = from + pageSize - 1
            query = query.range(from, to)
          }

          const { data, error, count } = await query

          if (error) {
            throw error
          }

          return { data: { data: data || [], count } }
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Ошибка при попытке получить список заказов",
              data: error,
            },
          }
        }
      },
      providesTags: [RealizationTags.ACTIVE_REALIZATIONS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetActiveRealizationQuery } = getActiveRealization
