import type { Methods } from "src/shared/constants"
import { PostgrestFilterBuilder } from "@supabase/postgrest-js"
import type { Database } from "@shared"
import type { ClientServerOptions } from "@supabase/supabase-js/dist/module/lib/rest/types/common/common"

type PublicSchema = Database["public"] & { Views?: object; Functions?: object }

type ValueOf<T> = T[keyof T]

type PostgrestBuilder<Row extends Record<string, unknown>> = PostgrestFilterBuilder<
  ClientServerOptions,
  PublicSchema,
  Row,
  Row[],
  string,
  unknown,
  "GET" | "PATCH" | "DELETE"
>

export type MyFilterBuilder<Row extends Record<string, unknown>> = PostgrestBuilder<Row> & {
  eq: (column: keyof Row & string, value: ValueOf<Row>) => MyFilterBuilder<Row>
  neq: (column: keyof Row & string, value: ValueOf<Row>) => MyFilterBuilder<Row>
  gt: (column: keyof Row & string, value: ValueOf<Row>) => MyFilterBuilder<Row>
  lt: (column: keyof Row & string, value: ValueOf<Row>) => MyFilterBuilder<Row>
}

type RequestParams<T = unknown> = {
  select?: string
  filter: (query: PostgrestBuilder<SafeRow<T>>) => PostgrestBuilder<SafeRow<T>>
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

type SafeRow<T> = T extends Record<string, unknown> ? T : Record<string, unknown>

export type ApiAdapter<T = unknown, P = unknown> = (
  args: AdapterParams<T, P>,
) => Promise<AdapterResponse<T>>
