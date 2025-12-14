import React, { useEffect, type ComponentProps } from "react"
import { Form } from "antd"

type FormValueConnectorProps<T> = {
  name: string | string[]
  valueByName: string | string[]
  children: (value: T) => React.ReactNode
  clearOnChange?: boolean
} & Omit<ComponentProps<typeof Form.Item>, "name" | "shouldUpdate" | "children">

export const FormValueConnector = <T,>({
  name,
  valueByName,
  children,
  clearOnChange = true,
  ...props
}: FormValueConnectorProps<T>) => {
  const form = Form.useFormInstance()
  const value = Form.useWatch(valueByName, form)

  useEffect(() => {
    if (clearOnChange && value !== undefined && value !== "") {
      form.setFieldValue(name, undefined)
    }
  }, [value, form, name, clearOnChange])

  return (
    <Form.Item name={name} {...props}>
      {children(value)}
    </Form.Item>
  )
}
