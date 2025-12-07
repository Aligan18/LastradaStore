import { Col, Form, type ColProps } from "antd"
import type { NamePath } from "antd/es/form/interface"
import type { ComponentProps, ReactNode } from "react"
const { Item } = Form

export type ColFormItemProps<T> = ComponentProps<typeof Item<T>> & {
  input: ReactNode
  groupName?: string
  colProps?: ColProps
}

export const ColFormItem = <T,>({
  input,
  groupName = "",
  name,
  colProps,
  ...formItemProps
}: ColFormItemProps<T>) => {
  return (
    <Col span={24} {...colProps}>
      <Item<T> name={[groupName, name] as NamePath} {...formItemProps}>
        {input}
      </Item>
    </Col>
  )
}
