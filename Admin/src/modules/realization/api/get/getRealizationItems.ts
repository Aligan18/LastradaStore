import {
  createSelectRequest,
  Methods,
  Tables,
  type MyFilterBuilder,
  type SelectStructure,
} from "@shared"
import { realizationApi } from "../realizationApi"
import type { FullRealizationItems, FullRealizationItemsResponse } from "../types"
import { RealizationTags } from "../realizationTags"

const select: SelectStructure<FullRealizationItems> = [
  "id",
  "realization_id",
  "earned",
  "product_id",
  "product_variant_id",
  "realization_price",
  "realization_quantity",
  { products: ["name", "id"] },
  { product_variants: ["size", { colors: ["name"] }] },
]

const selectRequest = createSelectRequest(select)

type Params = {
  id: number
}

const getRealizationItems = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    getRealizationItems: build.query<FullRealizationItemsResponse, Params>({
      query: ({ id }) => ({
        table: Tables.REALIZATION_ITEMS,
        method: Methods.GET_ALL,
        params: {
          select: selectRequest,
          filter: (query: MyFilterBuilder<FullRealizationItems>) => query.eq("realization_id", id),
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить список товаров" },
      }),
      providesTags: [RealizationTags.REALIZATION_ITEMS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetRealizationItemsQuery } = getRealizationItems
