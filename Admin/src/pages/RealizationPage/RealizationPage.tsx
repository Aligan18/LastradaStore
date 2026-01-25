import { RealizationTable } from "@modules"
import { AddRealizationModal } from "@widgets"
import { Flex, Typography } from "antd"

export const RealizationPage = () => {
  return (
    <Flex vertical gap={10}>
      <Flex justify="center">
        <Typography.Title level={4}>Активные продажи</Typography.Title>
      </Flex>
      <Flex vertical gap={15}>
        <AddRealizationModal />
        <RealizationTable />
      </Flex>
    </Flex>
  )
}
