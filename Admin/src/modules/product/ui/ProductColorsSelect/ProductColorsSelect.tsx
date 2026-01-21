import { Select, type SelectProps } from "antd"
import { useGetProductColorsQuery } from "../../api"

type ProductColorsSelect = SelectProps

export const ProductColorsSelect = ({ ...props }: ProductColorsSelect) => {
  const { colorOptions } = useGetProductColorsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      colorOptions: data?.data.map((colors) => ({ label: colors.name, value: colors.id })),
    }),
  })
  return <Select options={colorOptions} {...props} />
}
