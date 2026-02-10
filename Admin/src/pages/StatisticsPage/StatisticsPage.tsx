import { useGetRevenueStatisticQuery } from "@modules"

export const StatisticsPage = () => {
  const { data } = useGetRevenueStatisticQuery({ p_period: "day" })

  console.log(data)
  return <div>StatisticsPage</div>
}
