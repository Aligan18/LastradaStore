import { GridForm, type FormInputs, type FormRowAndCol } from "@shared"
import { Input } from "antd"

type FieldType = {
  images?: string
  name: string
  description?: string
  price: number
}

type AddProductProps = {
  withGroupName?: boolean
}

const formGrid: FormRowAndCol<FieldType>[] = [
  { cols: [{ name: "name" }] },
  { cols: [{ name: "images" }] },
  { cols: [{ name: "price" }] },
  { cols: [{ name: "description" }] },
]

const inputs: FormInputs<FieldType> = {
  images: {
    label: "Фото товара",
    name: "images",
    input: <Input />,
  },
  description: {
    label: "Описание",
    name: "description",
    input: <Input />,
  },
  price: {
    label: "Цена продажи",
    name: "price",
    rules: [{ required: true, message: "Введите цену продажи!" }],
    input: <Input />,
  },
  name: {
    label: "Название товара",
    name: "name",
    rules: [{ required: true, message: "Введите название товара!" }],
    input: <Input />,
  },
}

export const AddProduct = ({ withGroupName = false }: AddProductProps) => {
  const groupName = withGroupName ? "product" : ""
  return <GridForm<FieldType> inputs={inputs} grid={formGrid} groupName={groupName} />
}
