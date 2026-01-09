import { Methods, Tables } from "@shared"
import { realizationApi } from "../realizationApi"
import type { RealizationSingleResponse } from "../types"
import { RealizationTags } from "../realizationTags"

const deleteRealizationItems = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    deleteRealizationItems: build.mutation<RealizationSingleResponse, number>({
      query: (id) => ({
        table: Tables.REALIZATION_ITEMS,
        method: Methods.DELETE,
        id,
        extraOptions: { errorMessage: "Ошибка при попытке удалить заказ" },
      }),
      invalidatesTags: [RealizationTags.REALIZATION_ITEMS],
    }),
  }),
  overrideExisting: false,
})

export const { useDeleteRealizationItemsMutation } = deleteRealizationItems
