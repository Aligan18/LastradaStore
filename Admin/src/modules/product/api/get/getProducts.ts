import { Tables, Methods } from "@shared"
import { productApi } from "../productApi"
import type { Product } from "../types"

const getProducts = productApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product, void>({
      query: () => ({
        table: Tables.PRODUCTS,
        method: Methods.GET_ALL,
        extraOptions: { errorMessage: "Ошибка при попытке получить список товаров" },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductsQuery } = getProducts
