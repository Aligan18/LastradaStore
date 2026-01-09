import { normalizePhone } from "@shared"
import { Form, Input, type FormItemProps } from "antd"
import type { NamePath } from "antd/es/form/interface"

type PhoneInputProps = {
  name: string
  groupName?: string
  formItemProps?: FormItemProps
  disabled?: boolean
}

const validatePhone = (_: unknown, value: string) => {
  if (!value) return Promise.reject("Введите телефон")
  if (!/^\+7\d{10}$/.test(value)) {
    return Promise.reject("Номер должен быть в формате +7XXXXXXXXXX")
  }
  return Promise.resolve()
}

export const PhoneInput = ({ groupName, formItemProps, name, disabled }: PhoneInputProps) => {
  const formName: NamePath = groupName ? [groupName, name] : name

  return (
    <Form.Item
      normalize={(value: string) => normalizePhone(value)}
      name={formName}
      rules={[{ validator: validatePhone }]}
      {...formItemProps}>
      <Input disabled={disabled} placeholder="Телефон" />
    </Form.Item>
  )
}
