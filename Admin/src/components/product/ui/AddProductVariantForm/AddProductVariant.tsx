import { GridForm, type FormInputs, type FormRowAndCol, type Size } from "@shared"
import { ProductSizeSelect } from "src/modules/product/ui"
import { ProductColorsSelect } from "src/modules/product/ui/ProductColorsSelect/ProductColorsSelect"

export type AddProductVariantsFormItems = {
  size: Size
  color_id: number
}

export type AddProductVariantProps = {
  withGroupName?: boolean
}

const formRows: FormRowAndCol<AddProductVariantsFormItems>[] = [
  {
    gutter: 20,
    cols: [
      { span: 12, name: "size" },
      { span: 12, name: "color_id" },
    ],
  },
]

const inputs: FormInputs<AddProductVariantsFormItems> = {
  size: {
    label: "Размер",
    rules: [{ required: true }],
    input: <ProductSizeSelect />,
  },
  color_id: {
    label: "Цвет",
    rules: [{ required: true }],
    input: <ProductColorsSelect />,
  },
}

export const AddProductVariant = ({ withGroupName = false }: AddProductVariantProps) => {
  const groupName = withGroupName ? "product_variants" : ""
  return (
    <GridForm<AddProductVariantsFormItems> inputs={inputs} grid={formRows} groupName={groupName} />
  )
}
