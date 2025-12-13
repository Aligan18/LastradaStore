import type { Methods } from "src/shared/constants"

export interface MyFilterBuilder<Row extends Record<string, unknown>> {
  eq: (column: keyof Row, value: Row[keyof Row]) => MyFilterBuilder<Row>
  neq: (column: keyof Row, value: Row[keyof Row]) => MyFilterBuilder<Row>
  gt: (column: keyof Row, value: Row[keyof Row]) => MyFilterBuilder<Row>
  lt: (column: keyof Row, value: Row[keyof Row]) => MyFilterBuilder<Row>
}

type RequestParams<T = unknown> = {
  select?: string
  filter?: (query: MyFilterBuilder<SafeRow<T>>) => MyFilterBuilder<SafeRow<T>>
}

export type AdapterParams<T = unknown, P = unknown> = {
  table: string
  method: Methods
  params?: RequestParams<T>
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

type SafeRow<T> = T extends Record<keyof T, unknown> ? T : Record<keyof T, unknown>

export type ApiAdapter<T = unknown, P = unknown> = (
  args: AdapterParams<T, P>,
) => Promise<AdapterResponse<T>>

export type SelectStructure<T> = {
  [K in keyof T]: T[K] extends object ? K | { [P in K]: SelectStructure<T[K]> } : K
}[keyof T][]
