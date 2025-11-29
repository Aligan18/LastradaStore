import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReducerPath } from "@shared";

export const productApi = createApi({
  reducerPath: ReducerPath.PRODUCT,
  baseQuery: fakeBaseQuery(),
  endpoints: () => ({}),
});
