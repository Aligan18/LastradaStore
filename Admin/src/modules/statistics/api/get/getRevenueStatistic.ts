import { Methods, Tables, type ResponseAll } from "@shared"
import { statisticsApi } from "../statisticsApi"

type Params = { p_period: string; p_from?: string; p_to?: string }

type Response = ResponseAll<{ period: string; revenue: number; order_count: number }[]>

const getRevenueStatistic = statisticsApi.injectEndpoints({
  endpoints: (build) => ({
    getRevenueStatistic: build.query<Response, Params>({
      query: (payload) => ({
        table: Tables.STATISTICS_REVENUE,
        method: Methods.POSTGRES_FUNCTION,
        payload,
        extraOptions: { errorMessage: "Ошибка при попытке получить статистику дохода" },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetRevenueStatisticQuery } = getRevenueStatistic
