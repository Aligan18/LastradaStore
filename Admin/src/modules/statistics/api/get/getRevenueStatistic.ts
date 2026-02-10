import { Methods, Tables } from "@shared"
import { statisticsApi } from "../statisticsApi"

type Params = { p_period: string; p_from?: string; p_to?: string }

type Response = { period: string; revenue: number }[]

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
