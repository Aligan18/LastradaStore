import { Form, Select } from "antd"
import { useGetProductsQuery } from "../../api"

export const ProductSelect = () => {
  const { productOptions } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      productOptions: data
        ? data.map(({ name, id }) => ({
            label: `${id}-${name}`,
            value: id,
          }))
        : [],
    }),
  })

  return (
    <Form.Item name="product_id" label="Товар" rules={[{ required: true }]}>
      <Select options={productOptions} />
    </Form.Item>
  )
}
