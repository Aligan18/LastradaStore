import { supabase } from "@shared"
import { salaryApi } from "../salaryApi"
import { SalaryTags } from "../salaryTags"
import type { ProcessSalaryPaymentParams, SalaryPayment } from "../../types"

const processSalaryPayment = salaryApi.injectEndpoints({
  endpoints: (build) => ({
    processSalaryPayment: build.mutation<SalaryPayment, ProcessSalaryPaymentParams>({
      async queryFn({ user_id, role, amount, realization_ids, period_from, period_to, note }) {
        try {
          // Получаем настройки для записи в историю
          const { data: settings, error: settingsError } = await supabase
            .from("salary_settings")
            .select("*")
            .eq("user_id", user_id)
            .single()

          if (settingsError || !settings) {
            throw new Error("Настройки зарплаты не найдены")
          }

          if (!settings.is_active) {
            throw new Error("Начисление зарплаты отключено для этого сотрудника")
          }

          // Вызываем PostgreSQL функцию для обработки выплаты
          // Это заменяет ~200 запросов на ОДИН вызов функции!
          const { data: rpcData, error: rpcError } = await supabase.rpc(
            "process_salary_payment",
            {
              p_user_id: user_id,
              p_role: role,
              p_amount: amount,
              p_realization_ids: realization_ids,
              p_period_from: period_from,
              p_period_to: period_to,
              p_calculation_type: settings.calculation_type,
              p_calculation_value:
                settings.calculation_type === "fixed"
                  ? settings.fixed_amount
                  : settings.percentage,
              p_note: note,
            },
          )

          if (rpcError) {
            throw rpcError
          }

          // Получаем ID созданной выплаты из результата функции
          const paymentId = rpcData?.[0]?.payment_id

          if (!paymentId) {
            throw new Error("Не удалось получить ID выплаты")
          }

          // Получаем полные данные о созданной выплате
          const { data: payment, error: paymentError } = await supabase
            .from("salary_payments")
            .select("*")
            .eq("id", paymentId)
            .single()

          if (paymentError || !payment) {
            throw new Error("Не удалось получить данные о выплате")
          }

          return { data: payment }
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: error instanceof Error ? error.message : "Ошибка при обработке выплаты",
              data: error,
            },
          }
        }
      },
      invalidatesTags: (_result, _error, { user_id, role }) => [
        SalaryTags.PAYMENTS,
        { type: SalaryTags.PENDING_SALARY, id: `${user_id}-${role}` },
      ],
    }),
  }),
  overrideExisting: false,
})

export const { useProcessSalaryPaymentMutation } = processSalaryPayment
