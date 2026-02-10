import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdapter, ReducerPath } from "@shared"
import { statisticsTagsArray } from "./statisticsTags"

export const statisticsApi = createApi({
  reducerPath: ReducerPath.STATISTICS,
  baseQuery: baseQueryWithAdapter,
  tagTypes: statisticsTagsArray,
  endpoints: () => ({}),
})
