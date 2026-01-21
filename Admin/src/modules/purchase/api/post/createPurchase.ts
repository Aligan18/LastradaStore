import { Methods, Tables, type AdapterParams, type ResponseAll } from "@shared"
import { purchaseApi } from "../purchaseApi"
import type { CreatePurchase, Purchase } from "../types"
import { PurchaseTags } from "../purchaseTags"

const createPurchase = purchaseApi.injectEndpoints({
  endpoints: (build) => ({
    createPurchase: build.mutation<ResponseAll<Purchase>, CreatePurchase>({
      query: (payload): AdapterParams<ResponseAll<Purchase>, CreatePurchase> => ({
        method: Methods.CREATE,
        table: Tables.PURCHASES,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке создать закуп" },
      }),
      invalidatesTags: [PurchaseTags.ALL_PURCHASE],
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePurchaseMutation } = createPurchase
