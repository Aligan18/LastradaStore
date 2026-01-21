import { Select, type SelectProps } from "antd"
import { ProductSizes } from "../../api"

type ProductSizeSelectProps = SelectProps

const options = Object.keys(ProductSizes).map((key) => ({
  label: key,
  value: key,
}))

export const ProductSizeSelect = ({ ...props }: ProductSizeSelectProps) => {
  return <Select options={options} {...props} />
}
