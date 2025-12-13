import { Col, Form, type ColProps, type FormInstance } from "antd"
import type { NamePath } from "antd/es/form/interface"
import type { ComponentProps, ReactNode } from "react"
const { Item } = Form

export type ColFormItemProps<T> = ComponentProps<typeof Item<T>> & {
  input: ReactNode | ((form: FormInstance) => ReactNode)
  groupName?: string
  colProps?: ColProps
}

export const ColFormItem = <T,>({
  input,
  groupName = "",
  name,
  colProps,
  dependencies,
  ...formItemProps
}: ColFormItemProps<T>) => {
  const currentName = groupName && name ? ([groupName, name] as NamePath) : name
  const isInputFunction = typeof input === "function"
  return (
    <Col span={24} {...colProps}>
      {isInputFunction ? (
        <Item noStyle dependencies={dependencies}>
          {(form) => {
            const currentInput = input(form)
            return (
              currentInput && (
                <Item<T> name={currentName} {...formItemProps}>
                  {currentInput}
                </Item>
              )
            )
          }}
        </Item>
      ) : (
        <Item<T> name={currentName} {...formItemProps}>
          {input}
        </Item>
      )}
    </Col>
  )
}
