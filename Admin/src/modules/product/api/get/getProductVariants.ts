import {
  createSelectRequest,
  Methods,
  Tables,
  type AdapterParams,
  type SelectStructure,
} from "@shared"
import { productApi } from "../productApi"
import type { ProductVariants, ProductVariantsResponse } from "../types"
import { ProductTags } from "../productTags"

const selectRequest: SelectStructure<ProductVariants> = [
  "id",
  "size",
  "remaining",
  { colors: ["id", "name", "hex"] },
]

type RequestParams = {
  productId: number
}

const getProductVariants = productApi.injectEndpoints({
  endpoints: (build) => ({
    getProductVariants: build.query<ProductVariantsResponse, RequestParams>({
      query: ({ productId }): AdapterParams<ProductVariants> => ({
        table: Tables.VARIANTS,
        method: Methods.GET_ALL,
        params: {
          select: createSelectRequest(selectRequest),
          filter: (query) => query.eq("product_id", productId),
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить варианты товара" },
      }),
      providesTags: [ProductTags.ALL_VARIANTS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductVariantsQuery } = getProductVariants
