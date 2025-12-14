import { Methods, Tables } from "@shared"
import { purchaseApi } from "../purchaseApi"
import type { CreatePurchase, Purchase } from "../types"

const createPurchase = purchaseApi.injectEndpoints({
  endpoints: (build) => ({
    createPurchase: build.mutation<Purchase, CreatePurchase>({
      query: (payload) => ({
        method: Methods.CREATE,
        table: Tables.PURCHASES,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке создать закуп" },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePurchaseMutation } = createPurchase
