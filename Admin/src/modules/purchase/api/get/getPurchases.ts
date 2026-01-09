import {
  createSelectRequest,
  Methods,
  Tables,
  type SelectStructure,
  type Pagination,
} from "@shared"
import { purchaseApi } from "../purchaseApi"
import type { FullPurchase, FullPurchaseResponse } from "../types"
import { PurchaseTags } from "../purchaseTags"

const select: SelectStructure<FullPurchase> = [
  "id",
  "is_arrived",
  "note",
  "product_variant_id",
  "purchase_date",
  "purchase_price",
  "quantity_added",
  "total_spent",
  { product_variants: ["size", { colors: ["name"] }, { products: ["name"] }] },
]

const selectRequest = createSelectRequest(select)

type Params = {
  pagination?: Pagination
}

const getPurchases = purchaseApi.injectEndpoints({
  endpoints: (build) => ({
    getPurchases: build.query<FullPurchaseResponse, Params>({
      query: ({ pagination }) => ({
        table: Tables.PURCHASES,
        method: Methods.GET_ALL,
        params: {
          select: selectRequest,
          pagination,
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить список закупа" },
      }),
      providesTags: [PurchaseTags.ALL_PURCHASE],
    }),
  }),
  overrideExisting: false,
})

export const { useGetPurchasesQuery } = getPurchases
