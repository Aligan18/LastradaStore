-- Миграция: Оптимизация процесса выплаты зарплаты
-- Проблема: При выплате за N заказов делается 2N+2 запросов
-- Решение: PostgreSQL функция, которая обрабатывает всё в одной транзакции

-- 1. Добавляем уникальный индекс для UPSERT (если его еще нет)
-- Это необходимо для ON CONFLICT в функции
CREATE UNIQUE INDEX IF NOT EXISTS idx_realization_role_salaries_unique
  ON realization_role_salaries(realization_id, user_id, role);

-- 2. Создаем функцию для обработки выплаты зарплаты
CREATE OR REPLACE FUNCTION process_salary_payment(
  p_user_id TEXT,
  p_role app_role,
  p_amount NUMERIC,
  p_realization_ids INTEGER[],
  p_period_from TIMESTAMP,
  p_period_to TIMESTAMP,
  p_calculation_type TEXT,
  p_calculation_value NUMERIC,
  p_note TEXT DEFAULT NULL
)
RETURNS TABLE(payment_id INTEGER) AS $$
DECLARE
  v_payment_id INTEGER;
  v_salary_per_realization NUMERIC;
  v_realization_count INTEGER;
BEGIN
  -- Проверяем, что массив заказов не пустой
  v_realization_count := array_length(p_realization_ids, 1);

  IF v_realization_count IS NULL OR v_realization_count = 0 THEN
    RAISE EXCEPTION 'Список заказов не может быть пустым';
  END IF;

  -- 1. Создаем запись о выплате
  INSERT INTO salary_payments (
    user_id,
    amount,
    period_from,
    period_to,
    realization_count,
    calculation_type,
    calculation_value,
    note,
    payment_date
  ) VALUES (
    p_user_id,
    p_amount,
    p_period_from,
    p_period_to,
    v_realization_count,
    p_calculation_type,
    p_calculation_value,
    COALESCE(p_note, 'Выплата за ' || v_realization_count || ' заказов (' || p_role || ')'),
    NOW()
  )
  RETURNING id INTO v_payment_id;

  -- 2. Рассчитываем зарплату на один заказ
  v_salary_per_realization := p_amount / v_realization_count;

  -- 3. UPSERT записей зарплат (ОДИН запрос для всех заказов)
  -- ON CONFLICT обновляет существующие записи, INSERT создает новые
  INSERT INTO realization_role_salaries (
    realization_id,
    user_id,
    role,
    salary_amount,
    payment_id,
    is_paid,
    created_at,
    updated_at
  )
  SELECT
    unnest(p_realization_ids),
    p_user_id,
    p_role,
    v_salary_per_realization,
    v_payment_id,
    TRUE,
    NOW(),
    NOW()
  ON CONFLICT (realization_id, user_id, role)
  DO UPDATE SET
    salary_amount = EXCLUDED.salary_amount,
    payment_id = EXCLUDED.payment_id,
    is_paid = TRUE,
    updated_at = NOW();

  -- 4. Возвращаем ID созданной выплаты
  RETURN QUERY SELECT v_payment_id;
END;
$$ LANGUAGE plpgsql;

-- 3. Добавляем комментарии для документации
COMMENT ON FUNCTION process_salary_payment IS
'Обрабатывает выплату зарплаты за несколько заказов одной транзакцией.
Параметры:
  - p_user_id: ID пользователя
  - p_role: роль пользователя (admin, manager, packer)
  - p_amount: общая сумма выплаты
  - p_realization_ids: массив ID заказов
  - p_period_from: начало периода
  - p_period_to: конец периода
  - p_calculation_type: тип расчета (fixed/percentage)
  - p_calculation_value: значение для расчета
  - p_note: примечание (опционально)
Возвращает: ID созданной записи о выплате';

-- 4. Примеры использования функции (для справки)
/*
-- Пример 1: Выплата фиксированной суммы менеджеру за 10 заказов
SELECT * FROM process_salary_payment(
  'user-123',
  'manager'::app_role,
  50000.00,
  ARRAY[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  '2024-01-01'::timestamp,
  '2024-01-31'::timestamp,
  'fixed',
  5000.00,
  'Зарплата за январь 2024'
);

-- Пример 2: Выплата процента упаковщику за 5 заказов
SELECT * FROM process_salary_payment(
  'user-456',
  'packer'::app_role,
  15000.00,
  ARRAY[11, 12, 13, 14, 15],
  '2024-02-01'::timestamp,
  '2024-02-29'::timestamp,
  'percentage',
  10.00,
  NULL
);
*/
