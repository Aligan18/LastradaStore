import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithAdapter, ReducerPath } from "@shared"
import { salaryTagsArray } from "./salaryTags"

export const salaryApi = createApi({
  reducerPath: ReducerPath.SALARY,
  baseQuery: baseQueryWithAdapter,
  tagTypes: salaryTagsArray,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
})
