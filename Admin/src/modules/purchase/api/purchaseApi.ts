import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdapter, ReducerPath } from "@shared"
import { purchaseTagsArray } from "./purchaseTags"

export const purchaseApi = createApi({
  reducerPath: ReducerPath.PURCHASE,
  baseQuery: baseQueryWithAdapter,
  tagTypes: purchaseTagsArray,
  endpoints: () => ({}),
})
