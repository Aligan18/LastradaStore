import { CustomSelect } from "@shared"
import { useGetProductVariantsQuery } from "../../api"
import type { SelectProps } from "antd"

type ProductVariantSelectProps = { productId: number; label?: string } & SelectProps

export const ProductVariantSelect = ({ productId, ...props }: ProductVariantSelectProps) => {
  const { variantOptions } = useGetProductVariantsQuery(
    { productId },
    {
      selectFromResult: ({ data }) => ({
        variantOptions: data?.data
          ? data.data.map(({ colors, size, id, remaining }) => ({
              disabled: remaining === 0,
              label: `${colors.name} | ${size} | В наличии :${remaining} шт`,
              value: id,
            }))
          : [],
      }),
      skip: !productId,
    },
  )

  return (
    <CustomSelect
      showSearch={{
        filterOption: (input, option) =>
          String(option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase()),
      }}
      options={variantOptions}
      {...props}
    />
  )
}
