import { Table, Tag, Tooltip } from "antd"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"

interface SalaryPaymentWithUser {
  id: number
  user_id: string
  payment_date: string
  amount: number
  period_from: string
  period_to: string
  realization_count: number
  calculation_type: string
  calculation_value: number | null
  note: string | null
  created_at: string | null
  user_roles?: {
    user_name: string | null
    role: string
  }
}

interface Props {
  data: SalaryPaymentWithUser[]
  loading?: boolean
}

export const SalaryPaymentsHistory = ({ data, loading }: Props) => {
  const columns: ColumnsType<SalaryPaymentWithUser> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Дата выплаты",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (date: string) => dayjs(date).format("DD.MM.YYYY HH:mm"),
      width: 140,
    },
    {
      title: "Сотрудник",
      key: "user",
      render: (_, record) => record.user_roles?.user_name || "—",
      width: 150,
    },
    {
      title: "Период",
      key: "period",
      render: (_, record) => (
        <span>
          {dayjs(record.period_from).format("DD.MM.YY")} —{" "}
          {dayjs(record.period_to).format("DD.MM.YY")}
        </span>
      ),
      width: 150,
    },
    {
      title: "Заказов",
      dataIndex: "realization_count",
      key: "realization_count",
      width: 80,
      align: "center",
    },
    {
      title: "Тип",
      dataIndex: "calculation_type",
      key: "calculation_type",
      render: (type: string, record) => {
        if (type === "fixed") {
          return (
            <Tooltip title={`${record.calculation_value} ₽ за заказ`}>
              <Tag color="blue">Фикс.</Tag>
            </Tooltip>
          )
        }
        return (
          <Tooltip title={`${record.calculation_value}% от выручки`}>
            <Tag color="green">%</Tag>
          </Tooltip>
        )
      },
      width: 80,
      align: "center",
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
      render: (value: number) => (
        <span style={{ fontWeight: 600, color: "#3f8600" }}>{value} ₸</span>
      ),
      width: 120,
      align: "right",
    },
    {
      title: "Примечание",
      dataIndex: "note",
      key: "note",
      ellipsis: true,
      render: (text: string) => (
        <Tooltip title={text}>
          <span>{text || "—"}</span>
        </Tooltip>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 20,
        showSizeChanger: true,
        showTotal: (total) => `Всего: ${total} выплат`,
      }}
    />
  )
}
