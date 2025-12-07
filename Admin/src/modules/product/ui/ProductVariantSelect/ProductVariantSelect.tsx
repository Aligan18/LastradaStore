import { CustomSelect } from "@shared"
import { useGetProductVariantsQuery } from "../../api"
import type { SelectProps } from "antd"

type ProductVariantSelectProps = { productId: number } & SelectProps

export const ProductVariantSelect = ({ productId, ...props }: ProductVariantSelectProps) => {
  const { variantOptions } = useGetProductVariantsQuery(
    { productId },
    {
      selectFromResult: ({ data }) => ({
        variantOptions: data
          ? data.map(({ colors, size, id }) => ({
              label: `${colors.name}-${size}`,
              value: id,
            }))
          : [],
      }),
      skip: !productId,
    },
  )

  return <CustomSelect label={"Вариант"} options={variantOptions} {...props} />
}
