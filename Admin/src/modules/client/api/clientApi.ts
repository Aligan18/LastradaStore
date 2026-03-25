import { createApi } from "@reduxjs/toolkit/query/react"
import { ReducerPath } from "@shared"
import { baseQueryWithAdapter } from "@shared"
import { clientTagsArray } from "./clientTags"

export const clientApi = createApi({
  reducerPath: ReducerPath.CLIENT,
  baseQuery: baseQueryWithAdapter,
  tagTypes: clientTagsArray,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
})
