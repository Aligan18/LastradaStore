import { Form, Select, type FormItemProps, type SelectProps } from "antd"
import { useState } from "react"
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
  const [open, setOpen] = useState(false)
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

  const handleSelect: SelectProps["onSelect"] = (value, option) => {
    if (props.onSelect) props.onSelect(value, option)
    setOpen(false)
    setTimeout(() => {
      ;(document.activeElement as HTMLElement)?.blur()
    }, 0)
  }

  if (withFormItems) {
    return (
      <Form.Item name={formName} rules={[{ required: true }]} {...formItemProps}>
        <Select
          open={open}
          onOpenChange={setOpen}
          showSearch
          optionFilterProp="label"
          filterOption={(input, option) =>
            String(option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          onSelect={handleSelect}
          {...props}
          options={productOptions}
        />
      </Form.Item>
    )
  }

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      showSearch
      optionFilterProp="label"
      filterOption={(input, option) =>
        String(option?.label ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      onSelect={handleSelect}
      onChange={onChange}
      {...props}
      options={productOptions}
    />
  )
}
