import { supabase } from "../../configs"
import { Methods } from "../../constants"
import type { AdapterParams, AdapterResponse, MyFilterBuilder } from "./types/api"

const ALL = "*"

export const apiAdapter = async <
  T extends Record<string, unknown> = Record<string, unknown>,
  P = undefined,
>({
  table,
  method,
  payload,
  params = { filter: (query) => query },
  id,
}: AdapterParams<T, P>): Promise<AdapterResponse<T>> => {
  const select = params.select ?? ALL

  if (!params.filter) {
    params.filter = (query) => query
  }

  const paginationQuery = (query: MyFilterBuilder<T>) => {
    if (params.pagination) {
      const { current, pageSize } = params.pagination
      const from = (current - 1) * pageSize
      const to = from + pageSize - 1
      return query.range(from, to)
    }
    return query
  }

  try {
    let response

    switch (method) {
      case Methods.GET_ALL: {
        response = await params.filter(
          paginationQuery(
            supabase
              .from(table)
              .select(select, { count: "exact" })
              .order("id", { ascending: false }),
          ),
        )
        break
      }
      case Methods.GET_BY_ID:
        if (!id) throw new Error("ID is required for GET_BY_ID")
        response = await supabase.from(table).select(select).eq("id", id).single()
        break

      case Methods.CREATE:
        if (!payload) throw new Error("Payload is required for CREATE")
        response = await supabase.from(table).insert(payload).select(select).single()
        break

      case Methods.UPDATE:
        if (!id || !payload) throw new Error("ID and payload required for UPDATE")
        response = await supabase.from(table).update(payload).eq("id", id).select()
        break

      case Methods.DELETE:
        if (!id) throw new Error("ID required for DELETE")
        response = await supabase.from(table).delete().eq("id", id).select()
        break

      case Methods.POSTGRES_FUNCTION:
        response = await supabase.rpc(table, payload)
        break

      default:
        throw new Error("Unknown method")
    }

    if (response?.error) {
      throw response?.error
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response
  } catch (error) {
    return { error }
  }
}
