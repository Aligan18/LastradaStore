import { createApi } from "@reduxjs/toolkit/query/react"
import { ReducerPath } from "@shared"
import { baseQueryWithAdapter } from "@shared"

export const productApi = createApi({
  reducerPath: ReducerPath.PRODUCT,
  baseQuery: baseQueryWithAdapter,
  endpoints: () => ({}),
})
