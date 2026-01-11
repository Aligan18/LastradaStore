import { Methods, Tables, type AdapterParams, type ResponseAll } from "@shared"
import { clientApi } from "../clientApi"
import type { Clients, CreateClient } from "../types"
import { ClientTags } from "../clientTags"

const createClient = clientApi.injectEndpoints({
  endpoints: (build) => ({
    createClient: build.mutation<Clients, CreateClient>({
      query: (payload): AdapterParams<Clients> => ({
        table: Tables.CLIENTS,
        method: Methods.CREATE,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке создать клиента" },
      }),
      invalidatesTags: [ClientTags.CLIENT_BY_FIELD],
      transformResponse: (response: ResponseAll<Clients>) => response.data,
    }),
  }),
  overrideExisting: false,
})

export const { useCreateClientMutation } = createClient
