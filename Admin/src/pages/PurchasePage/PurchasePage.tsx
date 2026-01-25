import { PurchaseTable } from "@modules"
import { AddPurchaseModal } from "@widgets"
import { Flex, Typography } from "antd"

export const PurchasePage = () => {
  return (
    <Flex orientation="vertical" gap={20}>
      <Flex justify="center" align="center">
        <Typography.Title level={4}>История закупа</Typography.Title>
      </Flex>
      <AddPurchaseModal />
      <PurchaseTable />
    </Flex>
  )
}
