import {
  createSelectRequest,
  Methods,
  Tables,
  type MyFilterBuilder,
  type SelectStructure,
} from "@shared"
import { productApi } from "../productApi"
import type { ProductVariants } from "../types"

const selectRequest: SelectStructure<ProductVariants> = [
  "id",
  "size",
  { colors: ["id", "name", "hex"] },
]

type RequestParams = {
  productId: number
}

const getProductVariants = productApi.injectEndpoints({
  endpoints: (build) => ({
    getProductVariants: build.query<ProductVariants[], RequestParams>({
      query: ({ productId }) => ({
        table: Tables.VARIANTS,
        method: Methods.GET_ALL,
        params: {
          select: createSelectRequest(selectRequest),
          filter: (query: MyFilterBuilder<ProductVariants>) => query.eq("product_id", productId),
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить варианты товара" },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductVariantsQuery } = getProductVariants
