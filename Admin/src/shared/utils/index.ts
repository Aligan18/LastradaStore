import { apiAdapter } from "./api/apiAdapter"
import { customBaseQuery } from "./api/customBaseQuery"

export const baseQueryWithAdapter = customBaseQuery(apiAdapter)
