import { Tables, Methods } from "@shared"
import { productApi } from "../productApi"
import type { ColorsResponse } from "../types"
import { ProductTags } from "../productTags"

const getProductColors = productApi.injectEndpoints({
  endpoints: (build) => ({
    getProductColors: build.query<ColorsResponse, void>({
      query: () => ({
        table: Tables.COLORS,
        method: Methods.GET_ALL,
        extraOptions: { errorMessage: "Ошибка при попытке получить цвета товаров" },
      }),
      providesTags: [ProductTags.PRODUCT_COLORS],
    }),
  }),

  overrideExisting: false,
})

export const { useGetProductColorsQuery } = getProductColors
