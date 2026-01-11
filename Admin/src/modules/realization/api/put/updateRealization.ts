import { Methods, Tables } from "@shared"
import { realizationApi } from "../realizationApi"
import type { CreateRealization, RealizationSingleResponse } from "../types"
import { RealizationTags } from "../realizationTags"

type Params = {
  payload: CreateRealization
  id: number
}

const updateRealization = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    updateRealization: build.mutation<RealizationSingleResponse, Params>({
      query: ({ id, payload }) => ({
        table: Tables.REALIZATION,
        method: Methods.UPDATE,
        id,
        payload,
        extraOptions: { errorMessage: "Ошибка при изменить заказ" },
      }),
      invalidatesTags: [
        RealizationTags.ACTIVE_REALIZATIONS,
        RealizationTags.REALIZATION_BY_ID,
        RealizationTags.PACKAGE_REALIZATIONS,
      ],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateRealizationMutation } = updateRealization
