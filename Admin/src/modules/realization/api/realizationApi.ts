import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdapter, ReducerPath } from "@shared"
import { realizationTagsArray } from "./realizationTags"

export const realizationApi = createApi({
  reducerPath: ReducerPath.REALIZATION,
  baseQuery: baseQueryWithAdapter,
  tagTypes: realizationTagsArray,
  endpoints: () => ({}),
})
