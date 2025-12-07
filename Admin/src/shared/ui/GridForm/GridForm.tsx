import { Row, type ColProps } from "antd"
import { ColFormItem, type ColFormItemProps } from "./ColFormItem"
import type { ComponentProps } from "react"

export type FormRowAndCol<T> = ComponentProps<typeof Row> & {
  cols: ({ name: keyof T } & ColProps)[]
}

export type FormInputs<T> = Record<keyof T, ColFormItemProps<T>>

type GridFormProps<T> = {
  grid: FormRowAndCol<T>[]
  groupName?: string
  inputs: FormInputs<T>
}

export const GridForm = <T,>({ grid, groupName, inputs }: GridFormProps<T>) => {
  return grid.map(({ cols, ...rowProps }) => (
    <Row key={String(cols[0].name)} {...rowProps}>
      {cols.map((col) => (
        <ColFormItem<T>
          key={String(col.name)}
          groupName={groupName}
          colProps={col}
          {...inputs[col.name]}
          name={col.name}
        />
      ))}
    </Row>
  ))
}
