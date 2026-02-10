import { RevenueStatisticsTable } from "@modules"
import { Flex, Typography } from "antd"

export const StatisticsPage = () => {
  return (
    <Flex gap={15} vertical align="center">
      <Typography.Title level={4}>Статистика</Typography.Title>
      <RevenueStatisticsTable />
    </Flex>
  )
}
