import { supabase, type Pagination, type ResponseAll } from "@shared"
import { realizationApi } from "../realizationApi"
import { RealizationStatus, type FullRealization, type UserRole } from "../types"
import { RealizationTags } from "../realizationTags"

type Params = { pagination: Pagination }

const getFinishedRealization = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    getFinishedRealization: build.query<ResponseAll<FullRealization[]>, Params>({
      async queryFn({ pagination }) {
        try {
          // Получаем завершенные заказы с их items
          let query = supabase
            .from("realizations")
            .select(
              `
              *,
              realization_items(
                realization_quantity,
                realization_price,
                note,
                products(name, id),
                product_variants(size, colors(name))
              )
            `,
              { count: "exact" },
            )
            .in("status", [RealizationStatus.FINISHED])
            .order("realization_date", { ascending: false })

          if (pagination) {
            const { current = 1, pageSize = 10 } = pagination
            const from = (current - 1) * pageSize
            const to = from + pageSize - 1
            query = query.range(from, to)
          }

          const { data: realizations, error, count } = await query

          if (error) {
            throw error
          }

          if (!realizations || realizations.length === 0) {
            return { data: { data: [], total: 0 } }
          }

          // Получаем информацию о ролях для всех заказов
          const realizationIds = realizations.map((r) => r.id)
          const { data: roleSalaries } = await supabase
            .from("realization_role_salaries")
            .select(
              `
              realization_id,
              user_id,
              role,
              user_roles(user_id, user_name, role)
            `,
            )
            .in("realization_id", realizationIds)

          // Создаем карту ролей по заказам
          const rolesMap = new Map<number, { manager?: UserRole; packer?: UserRole }>()

          roleSalaries?.forEach((rs) => {
            if (!rolesMap.has(rs.realization_id)) {
              rolesMap.set(rs.realization_id, {})
            }

            const roles = rolesMap.get(rs.realization_id)!
            const userRoleData = Array.isArray(rs.user_roles)
              ? rs.user_roles[0]
              : rs.user_roles

            if (!userRoleData) return

            if (rs.role === "manager" && !roles.manager) {
              roles.manager = {
                user_id: userRoleData.user_id,
                user_name: userRoleData.user_name,
                role: userRoleData.role,
              } as UserRole
            } else if (rs.role === "packer" && !roles.packer) {
              roles.packer = {
                user_id: userRoleData.user_id,
                user_name: userRoleData.user_name,
                role: userRoleData.role,
              } as UserRole
            }
          })

          // Объединяем данные
          const fullRealizations: FullRealization[] = realizations.map((r) => {
            const roles = rolesMap.get(r.id) || {}
            return {
              ...r,
              manager: roles.manager || null,
              packer: roles.packer || null,
            }
          })

          return {
            data: {
              data: fullRealizations,
              total: count || 0,
            },
          }
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Ошибка при попытке получить историю заказов",
              data: error,
            },
          }
        }
      },
      providesTags: [RealizationTags.FINISHED_REALIZATIONS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetFinishedRealizationQuery } = getFinishedRealization
