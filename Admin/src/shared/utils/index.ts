import { apiAdapter } from "./api/apiAdapter"
import { customBaseQuery } from "./api/customBaseQuery"

export type { MyFilterBuilder, SelectStructure, Pagination, AdapterParams } from "./api/types/api"
export { createSelectRequest } from "./api/createSelectRequest"
export { isCustomApiError } from "./api/isCustomApiError"
export const baseQueryWithAdapter = customBaseQuery(apiAdapter)

export { normalizePhone } from "./normalizePhone"
export { sendToMessenger } from "./sendMessage/sendToMessenger"
