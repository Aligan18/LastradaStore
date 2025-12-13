import { apiAdapter } from "./api/apiAdapter"
import { customBaseQuery } from "./api/customBaseQuery"

export type { MyFilterBuilder, SelectStructure } from "./api/types/api"
export { createSelectRequest } from "./api/createSelectRequest"
export const baseQueryWithAdapter = customBaseQuery(apiAdapter)
