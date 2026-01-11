import { Methods, Tables, type AdapterParams } from "@shared"
import { purchaseApi } from "../purchaseApi"
import type { CreatePurchase, Purchase } from "../types"
import { PurchaseTags } from "../purchaseTags"

type Params = Pick<CreatePurchase, "is_arrived"> & {
  purchaseId: number
}

const updateIsArrive = purchaseApi.injectEndpoints({
  endpoints: (build) => ({
    updateIsArrive: build.mutation<Purchase, Params>({
      query: ({
        purchaseId,
        ...payload
      }): AdapterParams<Purchase, Pick<CreatePurchase, "is_arrived">> => ({
        method: Methods.UPDATE,
        table: Tables.PURCHASES,
        payload,
        id: purchaseId,
        extraOptions: { errorMessage: "Ошибка при попытке создать закуп" },
      }),
      invalidatesTags: [PurchaseTags.ALL_PURCHASE],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateIsArriveMutation } = updateIsArrive
