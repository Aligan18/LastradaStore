import { Tables, Methods, type ResponseAll, type AdapterParams } from "@shared"
import { clientApi } from "../clientApi"

import { ClientTags } from "../clientTags"
import type { Clients } from "../types"

type Params = Partial<Pick<Clients, "instagram_account" | "whats_app_account">>

const getClientByAccount = clientApi.injectEndpoints({
  endpoints: (build) => ({
    getClientByAccount: build.query<Clients, Params | null>({
      query: (params): AdapterParams<Clients> => ({
        table: Tables.CLIENTS,
        method: Methods.GET_ALL,
        params: {
          filter: (query) => {
            if (params) {
              Object.entries(params).forEach(([key, value]) => {
                query.eq(key as keyof Clients, value)
              })
              return query
            } else {
              return query
            }
          },
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить информацию о клиенте" },
      }),
      providesTags: [ClientTags.CLIENT_BY_FIELD],
      transformResponse: (response: ResponseAll<Clients[]>) => response.data[0],
    }),
  }),

  overrideExisting: false,
})

export const { useGetClientByAccountQuery } = getClientByAccount
