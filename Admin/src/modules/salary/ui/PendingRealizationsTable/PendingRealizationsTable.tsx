import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { PendingRealization } from "../../types"
import dayjs from "dayjs"

interface Props {
  data: PendingRealization[]
  loading?: boolean
}

export const PendingRealizationsTable = ({ data, loading }: Props) => {
  const columns: ColumnsType<PendingRealization> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Дата",
      dataIndex: "realization_date",
      key: "realization_date",
      render: (date: string) => dayjs(date).format("DD.MM.YYYY"),
      width: 120,
    },
    {
      title: "Клиент",
      dataIndex: "client_name",
      key: "client_name",
      ellipsis: true,
    },
    {
      title: "Выручка",
      dataIndex: "total_earned",
      key: "total_earned",
      render: (value: number) => `${value} ₸`,
      width: 120,
      align: "right",
    },
    {
      title: "К выплате",
      dataIndex: "salary_amount",
      key: "salary_amount",
      render: (value: number) => (
        <span style={{ fontWeight: 600, color: "#3f8600" }}>{value} ₸</span>
      ),
      width: 120,
      align: "right",
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Всего: ${total} заказов`,
      }}
      summary={(pageData) => {
        const totalEarned = pageData.reduce((sum, record) => sum + record.total_earned, 0)
        const totalSalary = pageData.reduce((sum, record) => sum + record.salary_amount, 0)

        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <strong>Итого на странице:</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <strong>{totalEarned} ₸</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="right">
                <strong style={{ color: "#3f8600" }}>{totalSalary.toFixed()} ₸</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )
      }}
    />
  )
}
