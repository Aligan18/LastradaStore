import { Methods, Tables } from "@shared"
import { realizationApi } from "../realizationApi"
import { type RealizationSingleResponse } from "../types"
import { RealizationTags } from "../realizationTags"

const getRealizationById = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    getRealizationById: build.query<RealizationSingleResponse, number>({
      query: (id) => ({
        table: Tables.REALIZATION,
        method: Methods.GET_BY_ID,
        id,
        extraOptions: { errorMessage: "Ошибка при попытке получить заказ" },
      }),
      providesTags: [RealizationTags.REALIZATION_BY_ID],
    }),
  }),
  overrideExisting: false,
})

export const { useGetRealizationByIdQuery } = getRealizationById
