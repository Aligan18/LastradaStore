import { GridForm, type FormInputs, type FormRowAndCol, type Size } from "@shared"
import { Input } from "antd"

type FieldType = {
  size: Size
  color_id: string
}

export type AddProductVariantProps = {
  withGroupName?: boolean
}

const formRows: FormRowAndCol<FieldType>[] = [
  {
    gutter: 20,
    cols: [
      { span: 12, name: "size" },
      { span: 12, name: "color_id" },
    ],
  },
]

const inputs: FormInputs<FieldType> = {
  size: {
    label: "Размер",
    rules: [{ required: true }],
    input: <Input />,
  },
  color_id: {
    label: "Цвет",
    rules: [{ required: true }],
    input: <Input />,
  },
}

export const AddProductVariant = ({ withGroupName = false }: AddProductVariantProps) => {
  const groupName = withGroupName ? "product_variants" : ""
  return <GridForm<FieldType> inputs={inputs} grid={formRows} groupName={groupName} />
}
