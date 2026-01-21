import { CustomTable, DEFAULT_PAGINATION, type Pagination } from "@shared"
import { useGetPurchasesQuery, useUpdateIsArriveMutation } from "../../api"
import type { ColumnsType } from "antd/es/table"
import type { FullPurchase } from "../../api/types"
import { Checkbox, type CheckboxChangeEvent } from "antd"
import { useState } from "react"

export const PurchaseTable = () => {
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)

  const { data } = useGetPurchasesQuery({ pagination })
  const [updateArrive] = useUpdateIsArriveMutation()

  const handleUpdateArrive = (event: CheckboxChangeEvent, purchaseId: number) => {
    updateArrive({ is_arrived: event.target.checked, purchaseId })
  }

  console.log(data)

  const columns: ColumnsType<FullPurchase> = [
    {
      key: "productName",
      title: "Название товара",
      render: (_, data) => data.product_variants?.products.name,
    },

    {
      key: "size",
      title: "Размер",
      align: "center",
      render: (_, data) => data.product_variants?.size,
    },
    {
      key: "color",
      title: "Цвет",
      render: (_, data) => data.product_variants?.colors.name,
    },
    {
      title: "Цена за штуку",
      dataIndex: "purchase_price",
      align: "center",
    },
    {
      title: "Количество штук",
      dataIndex: "quantity_added",
      align: "center",
    },
    {
      title: "Сумма закупа",
      dataIndex: "total_spent",
      align: "center",
    },
    {
      title: "Дата закупа",
      dataIndex: "purchase_date",
      render: (purchaseDate) => new Date(purchaseDate).toLocaleString(),
    },
    {
      title: "Дата прибытия",
      dataIndex: "arrival_date",
      render: (arrivalDate) => arrivalDate && new Date(arrivalDate).toLocaleString(),
    },
    {
      title: "Примечание",
      dataIndex: "note",
    },
    {
      title: "Товар доставлен",
      dataIndex: "is_arrived",
      align: "center",
      render: (isArrived, data) => (
        <Checkbox
          key={data.id}
          onChange={(event) => handleUpdateArrive(event, data.id)}
          checked={isArrived}
        />
      ),
    },
  ]

  return (
    <CustomTable<FullPurchase>
      pagination={{ ...pagination, total: data?.total }}
      setPagination={setPagination}
      dataSource={data?.data}
      columns={columns}
    />
  )
}
