import { Methods, Tables } from "@shared"
import { productApi } from "../productApi"
import type { CreateProduct, Product } from "../types"

const createProduct = productApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation<Product[], CreateProduct>({
      query: (payload) => ({
        table: Tables.PRODUCTS,
        method: Methods.CREATE,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке создать товар" },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateProductMutation } = createProduct
