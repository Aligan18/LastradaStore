import { createApi } from "@reduxjs/toolkit/query/react"
import { ReducerPath } from "@shared"
import { baseQueryWithAdapter } from "@shared"
import { productTagsArray } from "./productTags"

export const productApi = createApi({
  reducerPath: ReducerPath.PRODUCT,
  baseQuery: baseQueryWithAdapter,
  tagTypes: productTagsArray,
  endpoints: () => ({}),
})
