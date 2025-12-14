import { PurchaseTable } from "@modules"
import { AddPurchaseModal } from "@widgets"
import { Flex, Typography } from "antd"

export const PurchasePage = () => {
  return (
    <Flex orientation="vertical" gap={20}>
      <Flex justify="space-between" align="center">
        <Typography.Title level={4}>История закупа</Typography.Title>
        <AddPurchaseModal />
      </Flex>
      <PurchaseTable />
    </Flex>
  )
}
