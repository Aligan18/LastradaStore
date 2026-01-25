import { RealizationHistoryTable } from "@modules"
import { Flex, Typography } from "antd"

export const RealizationHistoryPage = () => {
  return (
    <Flex vertical gap={10}>
      <Flex justify="center">
        <Typography.Title level={4}>История закупа</Typography.Title>
      </Flex>
      <RealizationHistoryTable />
    </Flex>
  )
}
