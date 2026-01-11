import { Methods, Tables, type AdapterParams } from "@shared"
import { productApi } from "../productApi"
import type { CreateProductVariant, ProductVariants } from "../types"

const createProduct = productApi.injectEndpoints({
  endpoints: (build) => ({
    createProductVariant: build.mutation<ProductVariants[], CreateProductVariant>({
      query: (payload): AdapterParams<ProductVariants, CreateProductVariant> => ({
        table: Tables.VARIANTS,
        method: Methods.CREATE,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке создать вариант товар" },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateProductVariantMutation } = createProduct
