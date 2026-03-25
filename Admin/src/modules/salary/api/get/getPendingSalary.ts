import { supabase } from "@shared"
import { salaryApi } from "../salaryApi"
import { SalaryTags } from "../salaryTags"
import type { SalaryCalculationResult, PendingRealization, SalaryRole } from "../../types"

interface Params {
  userId: string
  role: SalaryRole
  dateFrom?: string
  dateTo?: string
}

const getPendingSalary = salaryApi.injectEndpoints({
  endpoints: (build) => ({
    getPendingSalary: build.query<SalaryCalculationResult, Params>({
      async queryFn({ userId, role, dateFrom, dateTo }) {
        try {
          // Получаем настройки зарплаты
          const { data: settings, error: settingsError } = await supabase
            .from("salary_settings")
            .select("*")
            .eq("user_id", userId)
            .single()

          if (settingsError && settingsError.code !== "PGRST116") {
            throw settingsError
          }

          // Если нет настроек или настройки неактивны
          if (!settings || !settings.is_active) {
            return {
              data: {
                user_id: userId,
                user_name: null,
                role,
                total_amount: 0,
                realization_count: 0,
                pending_realizations: [],
                settings: settings || null,
                total_earned: 0,
              },
            }
          }

          // Получаем информацию о пользователе
          const { data: userData } = await supabase
            .from("user_roles")
            .select("user_name")
            .eq("user_id", userId)
            .single()

          // Формируем запрос для получения неоплаченных заказов
          let realizationsQuery = supabase
            .from("realizations")
            .select(
              `
              id,
              realization_date,
              client_name,
              status,
              realization_items(earned)
            `,
            )
            .eq("status", "finished")
            .order("realization_date", { ascending: false })

          // Применяем фильтры по дате
          if (dateFrom) {
            realizationsQuery = realizationsQuery.gte("realization_date", dateFrom)
          }
          if (dateTo) {
            realizationsQuery = realizationsQuery.lte("realization_date", dateTo)
          }

          const { data: allRealizations, error: realizationsError } =
            await realizationsQuery

          if (realizationsError) {
            throw realizationsError
          }

          if (!allRealizations || allRealizations.length === 0) {
            return {
              data: {
                user_id: userId,
                user_name: userData?.user_name || null,
                role,
                total_amount: 0,
                realization_count: 0,
                pending_realizations: [],
                settings,
                total_earned: 0,
              },
            }
          }

          // Получаем информацию об оплатах для этого пользователя и роли
          const realizationIds = allRealizations.map((r) => r.id)
          const { data: salaryRecords } = await supabase
            .from("realization_role_salaries")
            .select("realization_id, is_paid")
            .in("realization_id", realizationIds)
            .eq("user_id", userId)
            .eq("role", role)

          // Создаем Set для быстрой проверки оплаченных заказов
          const paidRealizationIds = new Set(
            salaryRecords
              ?.filter((record) => record.is_paid)
              .map((record) => record.realization_id) || [],
          )

          // Фильтруем заказы
          let unpaidRealizations = allRealizations.filter(
            (r) => !paidRealizationIds.has(r.id),
          )

          // Если only_own_orders = true, дополнительно проверяем принадлежность
          if (settings.only_own_orders) {
            const { data: ownSalaryRecords } = await supabase
              .from("realization_role_salaries")
              .select("realization_id")
              .in("realization_id", realizationIds)
              .eq("user_id", userId)
              .eq("role", role)

            const ownRealizationIds = new Set(
              ownSalaryRecords?.map((record) => record.realization_id) || [],
            )

            unpaidRealizations = unpaidRealizations.filter((r) =>
              ownRealizationIds.has(r.id),
            )
          }

          // Рассчитываем зарплату для каждого заказа
          const pendingRealizations: PendingRealization[] = unpaidRealizations.map((r) => {
            const totalEarned =
              (r.realization_items as Array<{ earned: number | null }>)?.reduce((sum, item) => sum + (item.earned || 0), 0) ||
              0

            let salaryAmount = 0
            if (settings.calculation_type === "fixed" && settings.fixed_amount) {
              salaryAmount = settings.fixed_amount
            } else if (settings.calculation_type === "percentage" && settings.percentage) {
              salaryAmount = (totalEarned * settings.percentage) / 100
            }

            return {
              id: r.id,
              realization_date: r.realization_date,
              client_name: r.client_name,
              total_earned: totalEarned,
              salary_amount: salaryAmount,
            }
          })

          const totalAmount = pendingRealizations.reduce((sum, r) => sum + r.salary_amount, 0)
          const total_earned = pendingRealizations.reduce((sum, r) => sum + r.total_earned, 0)

          return {
            data: {
              user_id: userId,
              user_name: userData?.user_name || null,
              role,
              total_amount: totalAmount,
              realization_count: pendingRealizations.length,
              pending_realizations: pendingRealizations,
              total_earned,
              settings,
            },
          }
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Ошибка при расчете зарплаты",
              data: error,
            },
          }
        }
      },
      providesTags: (_result, _error, { userId, role }) => [
        { type: SalaryTags.PENDING_SALARY, id: `${userId}-${role}` },
      ],
    }),
  }),
  overrideExisting: false,
})

export const { useGetPendingSalaryQuery, useLazyGetPendingSalaryQuery } = getPendingSalary
