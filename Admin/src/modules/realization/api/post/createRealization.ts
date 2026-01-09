import { Methods, Tables } from "@shared"
import { realizationApi } from "../realizationApi"
import type { CreateRealization, RealizationSingleResponse } from "../types"
import { RealizationTags } from "../realizationTags"

const createRealization = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    createRealization: build.mutation<RealizationSingleResponse, CreateRealization>({
      query: (payload) => ({
        table: Tables.REALIZATION,
        method: Methods.CREATE,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке создать продажу" },
      }),
      invalidatesTags: [RealizationTags.ACTIVE_REALIZATIONS],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateRealizationMutation } = createRealization
