import { createSelectRequest, Methods, Tables, type SelectStructure } from "@shared"
import { purchaseApi } from "../purchaseApi"
import type { FullPurchase } from "../types"

const select: SelectStructure<FullPurchase> = [
  "id",
  "is_arrived",
  "note",
  "product_variant_id",
  "purchase_date",
  "purchase_price",
  "quantity_added",
  { product_variants: ["size", { colors: ["name"] }, { products: ["name"] }] },
]

const selectRequest = createSelectRequest(select)

const getPurchases = purchaseApi.injectEndpoints({
  endpoints: (build) => ({
    getPurchases: build.query<FullPurchase[], void>({
      query: () => ({
        table: Tables.PURCHASES,
        method: Methods.GET_ALL,
        params: {
          select: selectRequest,
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить список закупа" },
      }),
    }),
  }),
})

export const { useGetPurchasesQuery } = getPurchases
