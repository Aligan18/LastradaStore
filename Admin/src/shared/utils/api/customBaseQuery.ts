import type { BaseQueryFn } from "@reduxjs/toolkit/query"
import { message } from "antd"
import type { AdapterParams, ApiAdapter } from "./types/api"
import type { CustomApiError } from "./isCustomApiError"

let lastError = ""

export type ApiError = {
  message: string
  status: string
  details?: string
}

const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && !!error && "message" in error
}

export const customBaseQuery =
  (apiAdapter: ApiAdapter): BaseQueryFn<AdapterParams> =>
  async (args: AdapterParams) => {
    try {
      const { data, count, error } = await apiAdapter(args)
      if (error) throw error
      return { data: { data, total: count ?? 0 } }
    } catch (error) {
      const { extraOptions } = args
      const errorClientText = extraOptions?.errorMessage || "Произошла ошибка. Попробуйте позже."
      const errorlog = isApiError(error) ? error?.message : "Unknown error"

      console.error(error)

      if (!extraOptions?.skipErrorToast && errorClientText !== lastError) {
        message.error(errorClientText)
        lastError = errorClientText
        setTimeout(() => (lastError = ""), 3000)
      }
      return {
        error: {
          status: "CUSTOM_ERROR",
          message: errorlog,
          details: isApiError(error) && error.details ? JSON.parse(error.details) : null,
        } satisfies CustomApiError,
      }
    }
  }
