import {
  createSelectRequest,
  Methods,
  Tables,
  type AdapterParams,
  type Pagination,
  type ResponseAll,
  type SelectStructure,
} from "@shared"
import { realizationApi } from "../realizationApi"
import { RealizationStatus, type FullRealization, type FullRealizationItems } from "../types"
import { RealizationTags } from "../realizationTags"

type Params = { pagination: Pagination }

const selectRequest: SelectStructure<
  Omit<FullRealization, "realization_items"> & { realization_items: FullRealizationItems }
> = [
  "id",
  "messenger",
  "instagram_account",
  "whats_app_account",
  "note",
  "address",
  "city",
  "status",
  "client_name",
  "delivery_number",
  "postal_code",
  "realization_date",

  {
    realization_items: [
      "realization_quantity",
      "realization_price",
      "note",
      { products: ["name", "id"] },
      { product_variants: ["size", { colors: ["name"] }] },
    ],
  },
]

const getFinishedRealization = realizationApi.injectEndpoints({
  endpoints: (build) => ({
    getFinishedRealization: build.query<ResponseAll<FullRealization[]>, Params>({
      query: ({ pagination }): AdapterParams<FullRealization> => ({
        table: Tables.REALIZATION,
        method: Methods.GET_ALL,
        params: {
          pagination,
          select: createSelectRequest(selectRequest),
          filter: (query) => query.in("status", [RealizationStatus.FINISHED]),
        },
        extraOptions: { errorMessage: "Ошибка при попытке получить историю заказов" },
      }),
      providesTags: [RealizationTags.FINISHED_REALIZATIONS],
    }),
  }),
  overrideExisting: false,
})

export const { useGetFinishedRealizationQuery } = getFinishedRealization
