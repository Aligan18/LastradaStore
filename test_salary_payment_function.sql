-- Тестовые запросы для проверки функции process_salary_payment
-- Используйте эти запросы в Supabase SQL Editor для тестирования

-- ==========================================
-- 1. ПРОВЕРКА УСТАНОВКИ МИГРАЦИИ
-- ==========================================

-- Проверить, что функция создана
SELECT
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name = 'process_salary_payment';

-- Ожидаемый результат:
-- routine_name           | routine_type | data_type
-- process_salary_payment | FUNCTION     | USER-DEFINED


-- Проверить, что уникальный индекс создан
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'realization_role_salaries'
  AND indexname = 'idx_realization_role_salaries_unique';

-- Ожидаемый результат: должен вернуть строку с определением UNIQUE индекса


-- ==========================================
-- 2. ПОДГОТОВКА ТЕСТОВЫХ ДАННЫХ
-- ==========================================

-- Проверить существующих пользователей с настройками зарплаты
SELECT
  ur.user_id,
  ur.user_name,
  ur.role,
  ss.calculation_type,
  ss.fixed_amount,
  ss.percentage,
  ss.is_active,
  ss.only_own_orders
FROM user_roles ur
LEFT JOIN salary_settings ss ON ur.user_id = ss.user_id
WHERE ur.role IN ('manager', 'packer', 'admin')
ORDER BY ur.user_name;


-- Проверить завершенные заказы (finished), которые еще не оплачены
SELECT
  r.id,
  r.realization_date,
  r.client_name,
  r.status,
  SUM(ri.earned) as total_earned,
  -- Проверка, оплачен ли заказ менеджеру/упаковщику
  (SELECT COUNT(*) FROM realization_role_salaries rrs
   WHERE rrs.realization_id = r.id AND rrs.is_paid = true) as paid_roles_count
FROM realizations r
LEFT JOIN realization_items ri ON ri.realization_id = r.id
WHERE r.status = 'finished'
GROUP BY r.id
ORDER BY r.realization_date DESC
LIMIT 10;


-- ==========================================
-- 3. ТЕСТОВЫЙ ВЫЗОВ ФУНКЦИИ
-- ==========================================

-- ВАЖНО: Замените эти значения на реальные из вашей БД!
-- Используйте результаты запросов выше, чтобы получить:
-- - Реальный user_id (из таблицы user_roles)
-- - Реальные realization_ids (из таблицы realizations где status = 'finished')

/*
-- Пример 1: Тестовая выплата менеджеру
-- Замените 'REAL_USER_ID' на реальный ID пользователя
-- Замените массив [1, 2, 3] на реальные ID завершенных заказов

SELECT * FROM process_salary_payment(
  'REAL_USER_ID'::TEXT,           -- Замените на реальный user_id
  'manager'::app_role,             -- Роль: manager, packer или admin
  15000.00,                        -- Общая сумма выплаты
  ARRAY[1, 2, 3]::INTEGER[],       -- Замените на реальные ID заказов
  '2024-01-01'::TIMESTAMP,         -- Начало периода
  '2024-01-31'::TIMESTAMP,         -- Конец периода
  'fixed',                         -- Тип расчета: 'fixed' или 'percentage'
  5000.00,                         -- Значение: фиксированная сумма или процент
  'Тестовая выплата'               -- Примечание (опционально)
);
*/


-- ==========================================
-- 4. ПРОВЕРКА РЕЗУЛЬТАТОВ
-- ==========================================

-- После вызова функции проверьте результаты:

-- Проверить созданную выплату (последняя запись)
SELECT
  id,
  user_id,
  amount,
  realization_count,
  calculation_type,
  calculation_value,
  period_from,
  period_to,
  payment_date,
  note
FROM salary_payments
ORDER BY created_at DESC
LIMIT 1;


-- Проверить обновленные записи зарплат
-- Замените PAYMENT_ID на ID из предыдущего запроса
/*
SELECT
  rrs.id,
  rrs.realization_id,
  rrs.user_id,
  rrs.role,
  rrs.salary_amount,
  rrs.is_paid,
  rrs.payment_id,
  r.realization_date,
  r.client_name
FROM realization_role_salaries rrs
JOIN realizations r ON r.id = rrs.realization_id
WHERE rrs.payment_id = PAYMENT_ID  -- Замените на реальный payment_id
ORDER BY rrs.created_at DESC;
*/


-- ==========================================
-- 5. ТЕСТ UPSERT (обновление существующих)
-- ==========================================

-- Этот тест проверяет, что функция корректно обновляет
-- уже существующие записи (не создает дубликаты)

-- 1. Сначала создайте запись вручную
/*
INSERT INTO realization_role_salaries (
  realization_id,
  user_id,
  role,
  salary_amount,
  is_paid
) VALUES (
  1,                    -- Замените на реальный realization_id
  'REAL_USER_ID',       -- Замените на реальный user_id
  'manager'::app_role,
  1000.00,
  FALSE
);
*/

-- 2. Затем вызовите функцию с этим же заказом
-- Она должна ОБНОВИТЬ существующую запись, а не создать новую

-- 3. Проверьте, что запись обновилась (is_paid = TRUE, новый payment_id)
/*
SELECT * FROM realization_role_salaries
WHERE realization_id = 1            -- Замените на ваш ID
  AND user_id = 'REAL_USER_ID'      -- Замените на ваш user_id
  AND role = 'manager';
*/


-- ==========================================
-- 6. ТЕСТ ПРОИЗВОДИТЕЛЬНОСТИ
-- ==========================================

-- Этот запрос показывает время выполнения функции
-- с разным количеством заказов

-- Для точного теста нужны реальные данные
-- Замените на массив реальных ID завершенных заказов

/*
EXPLAIN ANALYZE
SELECT * FROM process_salary_payment(
  'REAL_USER_ID'::TEXT,
  'manager'::app_role,
  100000.00,
  ARRAY[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]::INTEGER[], -- 20 заказов
  '2024-01-01'::TIMESTAMP,
  '2024-12-31'::TIMESTAMP,
  'percentage',
  10.00,
  'Тест производительности'
);
*/

-- Обратите внимание на "Execution Time" в результатах
-- Должно быть < 100ms даже для 100+ заказов


-- ==========================================
-- 7. ОТКАТ ТЕСТОВЫХ ДАННЫХ (если нужно)
-- ==========================================

-- Если вы создали тестовые данные и хотите их удалить:

-- ОСТОРОЖНО! Эти команды удаляют данные!
-- Раскомментируйте только если уверены

/*
-- Удалить последнюю тестовую выплату
DELETE FROM salary_payments
WHERE id = PAYMENT_ID;  -- Замените на ID тестовой выплаты

-- Удалить связанные записи зарплат
DELETE FROM realization_role_salaries
WHERE payment_id = PAYMENT_ID;  -- Замените на ID тестовой выплаты
*/


-- ==========================================
-- 8. ПОЛЕЗНЫЕ СТАТИСТИЧЕСКИЕ ЗАПРОСЫ
-- ==========================================

-- Количество неоплаченных заказов по пользователям
SELECT
  ur.user_name,
  ur.role,
  COUNT(DISTINCT r.id) as unpaid_realizations
FROM user_roles ur
CROSS JOIN realizations r
LEFT JOIN realization_role_salaries rrs ON
  rrs.realization_id = r.id
  AND rrs.user_id = ur.user_id
  AND rrs.role = ur.role
  AND rrs.is_paid = TRUE
WHERE r.status = 'finished'
  AND rrs.id IS NULL
  AND ur.role IN ('manager', 'packer', 'admin')
GROUP BY ur.user_id, ur.user_name, ur.role
ORDER BY unpaid_realizations DESC;


-- Статистика выплат за последний месяц
SELECT
  ur.user_name,
  ur.role,
  COUNT(sp.id) as payments_count,
  SUM(sp.amount) as total_paid,
  SUM(sp.realization_count) as total_realizations
FROM salary_payments sp
JOIN user_roles ur ON ur.user_id = sp.user_id
WHERE sp.payment_date >= NOW() - INTERVAL '30 days'
GROUP BY ur.user_id, ur.user_name, ur.role
ORDER BY total_paid DESC;
