import { supabase } from "@shared"
import type { Database } from "@shared"

type AppRole = Database["public"]["Enums"]["app_role"]

/**
 * Создает или обновляет запись о роли пользователя в заказе
 */
export const upsertRealizationRoleSalary = async (
  realizationId: number,
  userId: string,
  role: AppRole,
) => {
  // Проверяем, существует ли уже запись
  const { data: existing } = await supabase
    .from("realization_role_salaries")
    .select("id")
    .eq("realization_id", realizationId)
    .eq("user_id", userId)
    .eq("role", role)
    .single()

  if (existing) {
    // Запись уже существует, ничего не делаем
    return { success: true, id: existing.id }
  }

  // Создаем новую запись
  const { data, error } = await supabase
    .from("realization_role_salaries")
    .insert({
      realization_id: realizationId,
      user_id: userId,
      role,
      is_paid: false,
    })
    .select("id")
    .single()

  if (error) {
    console.error("Ошибка при создании записи realization_role_salaries:", error)
    return { success: false, error }
  }

  return { success: true, id: data.id }
}

/**
 * Получает пользователей по роли для конкретного заказа
 */
export const getRealizationRoleUsers = async (realizationId: number, role?: AppRole) => {
  let query = supabase
    .from("realization_role_salaries")
    .select(
      `
      user_id,
      role,
      user_roles!inner(user_name, role)
    `,
    )
    .eq("realization_id", realizationId)

  if (role) {
    query = query.eq("role", role)
  }

  const { data, error } = await query

  if (error) {
    console.error("Ошибка при получении ролей заказа:", error)
    return []
  }

  return data
}

/**
 * Получает ID заказов для конкретного пользователя и роли
 */
export const getRealizationIdsByUserRole = async (userId: string, role: AppRole) => {
  const { data, error } = await supabase
    .from("realization_role_salaries")
    .select("realization_id")
    .eq("user_id", userId)
    .eq("role", role)

  if (error) {
    console.error("Ошибка при получении заказов пользователя:", error)
    return []
  }

  return data.map((item) => item.realization_id)
}
