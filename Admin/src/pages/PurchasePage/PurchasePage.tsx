import { PurchaseFilter, PurchaseTable } from "@modules"
import { AddPurchaseModal } from "@widgets"
import { Flex, Typography } from "antd"

export const PurchasePage = () => {
  return (
    <Flex orientation="vertical" gap={15}>
      <Typography.Title level={4}>История закупа</Typography.Title>
      <Flex justify="space-between" align="center">
        <PurchaseFilter />
        <AddPurchaseModal />
      </Flex>
      <PurchaseTable />
    </Flex>
  )
}
