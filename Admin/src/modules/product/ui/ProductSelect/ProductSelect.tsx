import { Form, Select, type FormItemProps, type SelectProps } from "antd"
import { useGetProductsQuery } from "../../api"

type ProductSelectProps = {
  groupName?: string
  formItemProps?: FormItemProps
  withFormItems?: boolean
} & SelectProps

const PRODUCT_ID = "product_id"

export const ProductSelect = ({
  groupName,
  withFormItems = false,
  formItemProps,
  onChange,
  ...props
}: ProductSelectProps) => {
  const { productOptions } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      productOptions: data?.data
        ? data.data.map(({ name, id, price }) => ({
            label: `${id} | ${name} | ${price} тг`,
            value: id,
          }))
        : [],
    }),
  })

  const formName = groupName ? [groupName, PRODUCT_ID] : PRODUCT_ID

  if (withFormItems) {
    return (
      <Form.Item name={formName} rules={[{ required: true }]} {...formItemProps}>
        <Select
          showSearch={{
            filterOption: (input, option) =>
              String(option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase()),
            optionFilterProp: "label",
          }}
          onSelect={(value, option) => {
            if (props.onSelect) props.onSelect(value, option)
            ;(document.activeElement as HTMLElement)?.blur()
          }}
          {...props}
          options={productOptions}
        />
      </Form.Item>
    )
  }

  return (
    <Select
      showSearch={{
        filterOption: (input, option) =>
          String(option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase()),
      }}
      onChange={onChange}
      {...props}
      options={productOptions}
    />
  )
}
