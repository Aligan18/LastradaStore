import type { ColumnProps } from "antd/es/table"
import {
  RealizationSteps,
  useGetActiveRealizationQuery,
  type Realization,
  type REALIZATION_STEPS,
} from "../../api"
import { CustomTable, DEFAULT_PAGINATION, useAppDispatch, type Pagination } from "@shared"
import { useState } from "react"
import { setCurrentRealizationId, setIsOpenRealizationModal } from "../../store"
import { MessengerIcon, ReturnToChatButton } from "@components"
import { deriveAccountByMessenger } from "../../utils"

const humanizeSteps = (step: REALIZATION_STEPS) => {
  const textByStep: Record<REALIZATION_STEPS, string> = {
    [RealizationSteps.ADD_PRODUCTS]: "Выбор товаров",
    [RealizationSteps.CLIENT_INFO]: "Данные доставки",
    [RealizationSteps.PAYMENT]: "Оплата",
  }
  return textByStep[step]
}

export const RealizationTable = () => {
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)
  const dispatch = useAppDispatch()

  const handleSelectRealization = (realization_id: number) => {
    dispatch(setCurrentRealizationId(realization_id))
    dispatch(setIsOpenRealizationModal(true))
  }

  const { activeRealization, total } = useGetActiveRealizationQuery(
    { pagination },
    {
      selectFromResult: ({ data }) => ({
        activeRealization: data?.data ?? [],
        total: data?.total,
      }),
    },
  )

  const columns: ColumnProps<Realization>[] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Аккаунт",
      key: "account",
      render: (_, { messenger, ...data }) => messenger && deriveAccountByMessenger(data, messenger),
    },
    {
      title: "Этап",
      dataIndex: "steps",
      render: (step) => humanizeSteps(step),
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
    <CustomTable<Realization>
      rowKey="id"
      onRow={(record) => ({
        onClick: () => handleSelectRealization(record.id),
      })}
      size={"small"}
      pagination={{ ...pagination, total }}
      setPagination={setPagination}
      dataSource={activeRealization}
      columns={columns}
    />
  )
}
