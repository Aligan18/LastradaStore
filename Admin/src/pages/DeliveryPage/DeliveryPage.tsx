import { CheckOutlined, IdcardOutlined, SkinOutlined } from "@ant-design/icons"
import { MessengerIcon, OrderNoteView, ProductRealizationList, ReturnToChatButton } from "@components"
import {
  DeliverySendModal,
  deriveAccountByMessenger,
  useGetPackageRealizationQuery,
  type FullRealization,
  type REALIZATION_STATUS,
} from "@modules"
import { CustomTable, DEFAULT_PAGINATION, type Pagination } from "@shared"
import { Button, Flex, Tabs, Tag, Typography, type TabsProps } from "antd"
import type { ColumnProps } from "antd/es/table"
import { useState } from "react"
import { RealizationStatus, useUpdateRealizationMutation } from "src/modules/realization/api"

import classes from "./DeliveryPage.module.scss"

export const DeliveryPage = () => {
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)

  const { packageRealization, total } = useGetPackageRealizationQuery(
    { pagination },
    {
      selectFromResult: ({ data }) => ({
        packageRealization: data?.data ?? [],
        total: data?.total,
      }),
    },
  )

  const [updateRealization] = useUpdateRealizationMutation()

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
      title: "Товар упакован",
      key: "status",
      render: (_, { status }) =>
        status === RealizationStatus.DELIVERY && (
          <Tag color="green" className={classes.successTag}>
            Упакован <CheckOutlined />
          </Tag>
        ),
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

  const handleChangeStatus = (realizationId: number, newStatus: REALIZATION_STATUS) => {
    updateRealization({ id: realizationId, payload: { status: newStatus } })
  }

  return (
    <Flex vertical gap={15}>
      <Flex justify="center">
        <Typography.Title level={3}> Доставка</Typography.Title>
      </Flex>
      <CustomTable<FullRealization>
        className={classes.table}
        rowKey="id"
        size={"small"}
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
                    <OrderNoteView note={record.note} />
                    {record.status === RealizationStatus.PACKAGE && (
                      <Button
                        variant="outlined"
                        onClick={() => handleChangeStatus(record.id, RealizationStatus.DELIVERY)}>
                        Упаковано
                      </Button>
                    )}
                  </Flex>
                ),
              },
              {
                key: RealizationStatus.DELIVERY,
                label: <IdcardOutlined />,
                children: <DeliverySendModal realization={record} />,
              },
            ]
            return (
              <Flex vertical className={classes.expandWrapper}>
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
          expandedRowKeys: packageRealization.map((row) => row.id),
          showExpandColumn: false,
        }}
        pagination={{ ...pagination, total }}
        setPagination={setPagination}
        dataSource={packageRealization}
        columns={columns}
      />
    </Flex>
  )
}
