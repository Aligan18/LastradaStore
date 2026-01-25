import { CustomTable, DEFAULT_PAGINATION, type Pagination } from "@shared"
import { RealizationStatus, useGetFinishedRealizationQuery, type FullRealization } from "../../api"
import { useState } from "react"
import type { ColumnProps } from "antd/es/table"
import { Flex, Tabs, type TabsProps } from "antd"
import { deriveAccountByMessenger } from "../../utils"
import {
  AddressInfoView,
  MessengerIcon,
  ProductRealizationList,
  ReturnToChatButton,
} from "@components"
import { IdcardOutlined, SkinOutlined } from "@ant-design/icons"

import classes from "./RealizationHistoryTable.module.scss"

export const RealizationHistoryTable = () => {
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([])

  const handleRowClick = (recordId: React.Key) => {
    setExpandedRowKeys((prev) => (prev.includes(recordId) ? [] : [recordId]))
  }

  const { finishedRealization, total } = useGetFinishedRealizationQuery(
    { pagination },
    {
      selectFromResult: ({ data }) => ({
        finishedRealization: data?.data ?? [],
        total: data?.total,
      }),
    },
  )

  const columns: ColumnProps<FullRealization>[] = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Аккаунт",
      key: "account",
      render: (_, { messenger, ...data }) => messenger && deriveAccountByMessenger(data, messenger),
    },
    {
      title: "Дата",
      dataIndex: "realization_date",
      render: (date: string) => {
        console.log(date)
        return new Date(date).toLocaleDateString()
      },
    },
    {
      title: "Чат",
      key: "in_chat",
      render: (_, { messenger, ...data }) => {
        if (messenger) {
          const currentAccount = deriveAccountByMessenger(data, messenger)
          return (
            currentAccount && (
              <ReturnToChatButton account={currentAccount} messenger={messenger}>
                <MessengerIcon messenger={messenger} />
              </ReturnToChatButton>
            )
          )
        }
      },
    },
  ]

  return (
    <CustomTable<FullRealization>
      className={classes.table}
      rowKey="id"
      size={"small"}
      onRow={(record) => ({
        onClick: () => handleRowClick(record.id),
        style: { cursor: "pointer" },
      })}
      expandable={{
        expandedRowRender: (record) => {
          const items: TabsProps["items"] = [
            {
              key: RealizationStatus.PACKAGE,
              label: <SkinOutlined />,
              children: (
                <Flex vertical>
                  <strong>Упаковка:</strong>
                  <ProductRealizationList realizationItems={record.realization_items} />
                </Flex>
              ),
            },
            {
              key: RealizationStatus.DELIVERY,
              label: <IdcardOutlined />,
              children: (
                <Flex vertical>
                  <strong>Доставка:</strong>
                  <AddressInfoView withCopy realization={record} />
                </Flex>
              ),
            },
          ]
          return (
            <Flex vertical>
              <Tabs
                centered
                key={record.status}
                defaultActiveKey={record.status}
                className={classes.tabsContainer}
                items={items}
              />
              <div className={classes.space} />
            </Flex>
          )
        },
        expandedRowKeys: expandedRowKeys,
        onExpand: (_, record) => handleRowClick(record.id),
        showExpandColumn: false,
      }}
      pagination={{ ...pagination, total }}
      setPagination={setPagination}
      dataSource={finishedRealization}
      columns={columns}
    />
  )
}
