import { GridForm, type FormInputs, type FormRowAndCol } from "@shared"
import { Input } from "antd"

type FieldType = {
  images?: string
  name: string
  description?: string
  price: number
}

export type AddProductProps = {
  withGroupName?: boolean
}

const formGrid: FormRowAndCol<FieldType>[] = [
  { cols: [{ name: "images" }] },
  { cols: [{ name: "name" }] },
  { cols: [{ name: "price" }] },
  { cols: [{ name: "description" }] },
]

const inputs: FormInputs<FieldType> = {
  images: {
    label: "Фото товара",
    input: <Input />,
  },
  description: {
    label: "Описание",
    input: <Input />,
  },
  price: {
    label: "Цена продажи",
    rules: [{ required: true, message: "Введите цену продажи!" }],
    input: <Input />,
  },
  name: {
    label: "Название товара",
    rules: [{ required: true, message: "Введите название товара!" }],
    input: <Input />,
  },
}

export const AddProduct = ({ withGroupName = false }: AddProductProps) => {
  const groupName = withGroupName ? "product" : ""
  return <GridForm<FieldType> inputs={inputs} grid={formGrid} groupName={groupName} />
}
