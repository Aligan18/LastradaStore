export type CustomApiError = {
  message: string
  status: "CUSTOM_ERROR"
  details: string[] | null
}

export const isCustomApiError = (error: unknown): error is CustomApiError => {
  return !!(
    typeof error === "object" &&
    error &&
    "status" in error &&
    error.status === "CUSTOM_ERROR"
  )
}
