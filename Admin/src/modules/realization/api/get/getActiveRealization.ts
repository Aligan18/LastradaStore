import { Methods, Tables, type MyFilterBuilder, type Pagination } from "@shared"
import { realizationApi } from "../realizationApi"
import { RealizationStatus, type Realization, type RealizationResponse } from "../types"
import { RealizationTags } from "../realizationTags"

type Params = { pagination: Pagination }

const getActiveRealization = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    getActiveRealization: build.query<RealizationResponse, Params>({
      query: ({ pagination }) => ({
        table: Tables.REALIZATION,
        method: Methods.GET_ALL,
        params: {
          pagination,
          filter: (query: MyFilterBuilder<Realization>) =>
            query.eq("status", RealizationStatus.ACTIVE),
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить список заказов" },
      }),
      providesTags: [RealizationTags.ACTIVE_REALIZATIONS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetActiveRealizationQuery } = getActiveRealization
