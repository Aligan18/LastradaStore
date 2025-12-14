import { Tables, Methods } from "@shared"
import { productApi } from "../productApi"
import type { ProductsResponse } from "../types"
import { ProductTags } from "../productTags"

const getProducts = productApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, void>({
      query: () => ({
        table: Tables.PRODUCTS,
        method: Methods.GET_ALL,
        extraOptions: { errorMessage: "Ошибка при попытке получить список товаров" },
      }),
      providesTags: [ProductTags.ALL_PRODUCTS],
    }),
  }),

  overrideExisting: false,
})

export const { useGetProductsQuery } = getProducts
