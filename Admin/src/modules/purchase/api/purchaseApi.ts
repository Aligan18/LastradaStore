import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdapter, ReducerPath } from "@shared"

export const purchaseApi = createApi({
  reducerPath: ReducerPath.PURCHASE,
  baseQuery: baseQueryWithAdapter,
  endpoints: () => ({}),
})
