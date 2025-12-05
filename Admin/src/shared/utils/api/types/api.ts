import type { Methods } from "src/shared/constants"

export type AdapterParams<P = unknown> = {
  table: string
  method: Methods
  payload?: P
  id?: number | string
  extraOptions?: ExtraOptions
}

export type ExtraOptions = {
  errorMessage?: string
  skipErrorToast?: boolean
}

export type AdapterResponse<T> = {
  data?: T
  error?: unknown
}

export type ApiAdapter<T = unknown, P = unknown> = (
  args: AdapterParams<P>,
) => Promise<AdapterResponse<T>>
