import { Methods, Tables } from "@shared"
import { realizationApi } from "../realizationApi"
import type { CreateRealizationItems } from "../types"
import { RealizationTags } from "../realizationTags"

const createRealizationItems = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    createRealizationItems: build.mutation<void, CreateRealizationItems>({
      query: (payload) => ({
        table: Tables.REALIZATION_ITEMS,
        method: Methods.CREATE,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке создать список товаров" },
      }),
      invalidatesTags: [RealizationTags.REALIZATION_ITEMS],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateRealizationItemsMutation } = createRealizationItems
