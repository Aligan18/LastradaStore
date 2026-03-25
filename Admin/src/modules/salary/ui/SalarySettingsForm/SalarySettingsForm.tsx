import { Form, Radio, Switch, Button, Space, InputNumber, Checkbox } from "antd"
import { useEffect } from "react"
import type { SalarySettingFormData, SalarySetting } from "../../types"

interface Props {
  initialValues?: SalarySetting | null
  onSubmit: (values: SalarySettingFormData) => void
  loading?: boolean
  userId: string
}

export const SalarySettingsForm = ({ initialValues, onSubmit, loading, userId }: Props) => {
  const [form] = Form.useForm<SalarySettingFormData>()
  const calculationType = Form.useWatch("calculation_type", form)

  console.log("initialValues ", initialValues)

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        user_id: initialValues.user_id,
        calculation_type: initialValues.calculation_type as "fixed" | "percentage",
        fixed_amount: initialValues.fixed_amount,
        percentage: initialValues.percentage,
        is_active: initialValues.is_active ?? true,
        only_own_orders: initialValues.only_own_orders,
      })
    } else {
      form.setFieldsValue({
        user_id: userId,
        calculation_type: "fixed",
        is_active: true,
      })
    }
  }, [initialValues, form, userId])

  const handleSubmit = (values: SalarySettingFormData) => {
    onSubmit({
      ...values,
      user_id: userId,
    })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        calculation_type: "fixed",
        is_active: true,
      }}>
      <Form.Item label="Активировать выплату зарплаты" name="is_active" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item
        label="Тип расчета"
        name="calculation_type"
        rules={[{ required: true, message: "Выберите тип расчета" }]}>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="fixed">Фиксированная сумма за заказ</Radio>
            <Radio value="percentage">Процент от выручки заказа</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {calculationType === "fixed" && (
        <Form.Item
          label="Сумма за заказ (₸)"
          name="fixed_amount"
          rules={[
            { required: true, message: "Введите сумму" },
            { type: "number", min: 0, message: "Сумма должна быть положительной" },
          ]}>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Например, 500"
            addonAfter="₸"
            min={0}
          />
        </Form.Item>
      )}

      {calculationType === "percentage" && (
        <Form.Item
          label="Процент от выручки (%)"
          name="percentage"
          rules={[
            { required: true, message: "Введите процент" },
            {
              type: "number",
              min: 0,
              max: 100,
              message: "Процент должен быть от 0 до 100",
            },
          ]}>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Например, 5"
            addonAfter="%"
            min={0}
            max={100}
            step={0.1}
          />
        </Form.Item>
      )}

      <Form.Item valuePropName="checked" name="only_own_orders">
        <Checkbox>Засчитывать только заказы этого пользователя</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Сохранить настройки
        </Button>
      </Form.Item>
    </Form>
  )
}
