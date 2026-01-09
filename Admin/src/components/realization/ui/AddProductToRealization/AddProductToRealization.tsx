import { ProductSelect, ProductVariantSelect } from "@modules"
import { FormValueConnector, GridForm, type FormInputs, type FormRowAndCol } from "@shared"
import { Flex, InputNumber } from "antd"

export type AddProductToRealizationFormItems = {
  product_id: number
  product_variant_id: number
  realization_price: number
  realization_quantity: number
  earned: number
}

const grid: FormRowAndCol<AddProductToRealizationFormItems>[] = [
  {
    cols: [{ name: "product_id" }],
  },
  {
    cols: [{ name: "product_variant_id" }],
  },
  {
    cols: [
      { span: 8, name: "realization_price" },
      { span: 8, name: "realization_quantity" },
      { span: 8, name: "earned" },
    ],
  },
]

const inputs: FormInputs<AddProductToRealizationFormItems> = {
  product_id: { input: <ProductSelect placeholder={"Товар"} /> },
  product_variant_id: {
    input: (
      <FormValueConnector<number>
        valueByName="product_id"
        name="product_variant_id"
        rules={[{ required: true }]}>
        {(productId) => (
          <ProductVariantSelect placeholder={"Вариант"} productId={productId} key={productId} />
        )}
      </FormValueConnector>
    ),
  },
  realization_price: {
    rules: [{ required: true }],
    label: "Цена",
    input: <InputNumber min={1} />,
  },
  realization_quantity: {
    rules: [{ required: true }],
    label: "Количество",
    input: <InputNumber min={1} />,
  },
  earned: {
    label: "Сумма",
    dependencies: ["realization_price", "realization_quantity"],
    input: ({ getFieldValue, setFieldValue }) => {
      const quantity = getFieldValue("realization_quantity")
      const price = getFieldValue("realization_price")

      const sum = (quantity ?? 0) * (price ?? 0)

      setFieldValue("earned", sum)

      return <Flex>{sum}</Flex>
    },
  },
}

export const AddProductToRealization = () => {
  return <GridForm<AddProductToRealizationFormItems> grid={grid} inputs={inputs} />
}
