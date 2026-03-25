-- Миграция: Создание таблицы realization_role_salaries для нормализации выплат

-- 1. Создаем новую таблицу для хранения информации о зарплатах по ролям
CREATE TABLE IF NOT EXISTS realization_role_salaries (
  id SERIAL PRIMARY KEY,
  realization_id INTEGER NOT NULL REFERENCES realizations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES user_roles(user_id),
  role app_role NOT NULL,
  salary_amount NUMERIC,
  payment_id INTEGER REFERENCES salary_payments(id),
  is_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Создаем индексы для оптимизации запросов
CREATE INDEX idx_realization_role_salaries_realization_id ON realization_role_salaries(realization_id);
CREATE INDEX idx_realization_role_salaries_user_id ON realization_role_salaries(user_id);
CREATE INDEX idx_realization_role_salaries_role ON realization_role_salaries(role);
CREATE INDEX idx_realization_role_salaries_is_paid ON realization_role_salaries(is_paid);
CREATE INDEX idx_realization_role_salaries_payment_id ON realization_role_salaries(payment_id);

-- 3. Мигрируем существующие данные из realizations

-- Мигрируем данные менеджеров
INSERT INTO realization_role_salaries (realization_id, user_id, role, salary_amount, payment_id, is_paid)
SELECT
  id,
  manager_id,
  'manager'::app_role,
  manager_salary_amount,
  manager_payment_id,
  COALESCE(manager_paid, false)
FROM realizations
WHERE manager_id IS NOT NULL;

-- Мигрируем данные упаковщиков
INSERT INTO realization_role_salaries (realization_id, user_id, role, salary_amount, payment_id, is_paid)
SELECT
  id,
  packer_id,
  'packer'::app_role,
  packer_salary_amount,
  packer_payment_id,
  COALESCE(packer_paid, false)
FROM realizations
WHERE packer_id IS NOT NULL;

-- Мигрируем данные админов (если они есть)
INSERT INTO realization_role_salaries (realization_id, user_id, role, salary_amount, payment_id, is_paid)
SELECT
  id,
  admin_id,
  'admin'::app_role,
  admin_salary_amount,
  admin_payment_id,
  COALESCE(admin_paid, false)
FROM realizations
WHERE admin_id IS NOT NULL;

-- 4. Удаляем старые колонки из realizations (раскомментируйте после проверки миграции)
-- ALTER TABLE realizations
-- DROP COLUMN IF EXISTS manager_id,
-- DROP COLUMN IF EXISTS manager_paid,
-- DROP COLUMN IF EXISTS manager_payment_id,
-- DROP COLUMN IF EXISTS manager_salary_amount,
-- DROP COLUMN IF EXISTS packer_id,
-- DROP COLUMN IF EXISTS packer_paid,
-- DROP COLUMN IF EXISTS packer_payment_id,
-- DROP COLUMN IF EXISTS packer_salary_amount,
-- DROP COLUMN IF EXISTS admin_id,
-- DROP COLUMN IF EXISTS admin_paid,
-- DROP COLUMN IF EXISTS admin_payment_id,
-- DROP COLUMN IF EXISTS admin_salary_amount;

-- 5. Создаем функцию для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_realization_role_salaries_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Создаем триггер для автоматического обновления updated_at
CREATE TRIGGER trigger_update_realization_role_salaries_updated_at
  BEFORE UPDATE ON realization_role_salaries
  FOR EACH ROW
  EXECUTE FUNCTION update_realization_role_salaries_updated_at();

-- 7. Добавляем комментарии к таблице
COMMENT ON TABLE realization_role_salaries IS 'Хранит информацию о зарплатах сотрудников по каждому заказу (realization)';
COMMENT ON COLUMN realization_role_salaries.realization_id IS 'ID заказа';
COMMENT ON COLUMN realization_role_salaries.user_id IS 'ID пользователя';
COMMENT ON COLUMN realization_role_salaries.role IS 'Роль пользователя (admin, manager, packer)';
COMMENT ON COLUMN realization_role_salaries.salary_amount IS 'Сумма зарплаты за этот заказ';
COMMENT ON COLUMN realization_role_salaries.payment_id IS 'ID выплаты (если оплачено)';
COMMENT ON COLUMN realization_role_salaries.is_paid IS 'Флаг оплаты';
