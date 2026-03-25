import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdapter, ReducerPath } from "@shared"
import { authTagsArray } from "./authTags"

export const authApi = createApi({
  reducerPath: ReducerPath.AUTH,
  baseQuery: baseQueryWithAdapter,
  tagTypes: authTagsArray,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
})
