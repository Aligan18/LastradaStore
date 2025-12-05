import { PurchaseFilter, PurchaseTable } from "@modules"
import { AddPurchaseModal } from "@widgets"

export const PurchasePage = () => {
  return (
    <>
      <PurchaseFilter />
      <AddPurchaseModal />
      <PurchaseTable />
    </>
  )
}
