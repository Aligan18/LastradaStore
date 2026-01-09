import { Methods, Tables } from "@shared"
import { realizationApi } from "../realizationApi"
import type { CreateRealizationItems, RealizationSingleResponse } from "../types"
import { RealizationTags } from "../realizationTags"

type Params = {
  payload: CreateRealizationItems
  id: number
}

const updateRealizationItems = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    updateRealizationItems: build.mutation<RealizationSingleResponse, Params>({
      query: ({ id, payload }) => ({
        table: Tables.REALIZATION_ITEMS,
        method: Methods.UPDATE,
        id,
        payload,
        extraOptions: { errorMessage: "Ошибка при изменить товар заказа" },
      }),
      invalidatesTags: [RealizationTags.REALIZATION_ITEMS],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateRealizationItemsMutation } = updateRealizationItems
