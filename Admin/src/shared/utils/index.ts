import { apiAdapter } from "./api/apiAdapter"
import { customBaseQuery } from "./api/customBaseQuery"
export type { MyFilterBuilder } from "./api/types/api"

export const baseQueryWithAdapter = customBaseQuery(apiAdapter)
