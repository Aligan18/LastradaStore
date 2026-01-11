/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Methods } from "src/shared/constants"

type onlyString<T> = Extract<T, string>
export interface MyFilterBuilder<Row extends Record<string, unknown>> {
  eq: (column: onlyString<keyof Row>, value: any) => MyFilterBuilder<Row>
  neq: (column: onlyString<keyof Row>, value: any) => MyFilterBuilder<Row>
  gt: (column: onlyString<keyof Row>, value: any) => MyFilterBuilder<Row>
  lt: (column: onlyString<keyof Row>, value: any) => MyFilterBuilder<Row>
  in: (column: onlyString<keyof Row>, value: any[]) => MyFilterBuilder<Row>
  range: (from: number, to: number) => MyFilterBuilder<Row>
  order: (column: onlyString<keyof Row>, sort: { ascending: boolean }) => MyFilterBuilder<Row>
  error?: unknown
}

type RequestParams<T extends Record<string, unknown>> = {
  select?: string
  filter?: (query: MyFilterBuilder<T>) => MyFilterBuilder<T>
  pagination?: Pagination
}

export type AdapterParams<
  T extends Record<string, unknown> = Record<string, unknown>,
  P = unknown,
> = {
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
  data?: T | T[] | null
  count?: number | null
  error?: unknown
}

export type ApiAdapter = <T extends Record<string, unknown>, P = unknown>(
  args: AdapterParams<T, P>,
) => Promise<AdapterResponse<T>>

export type SelectStructure<T> = {
  [K in keyof T]: T[K] extends object ? K | { [P in K]: SelectStructure<T[K]> } : K
}[keyof T][]

export type Pagination = { pageSize: number; current: number }
