import { useState } from "react"
import { DatePicker, Flex, Select, Table, Typography } from "antd"
import type { ColumnProps } from "antd/es/table"
import type { Dayjs } from "dayjs"

import { useGetRevenueStatisticQuery } from "../../api"

import classnames from "./RevenueStatisticsTable.module.scss"
import dayjs from "dayjs"

type StatRow = { period: string; revenue: number; order_count: number }

const periodOptions = [
  { value: "day", label: "Дням" },
  { value: "week", label: "Неделям" },
  { value: "month", label: "Месяцам" },
  { value: "year", label: "Годам" },
]

const columns: ColumnProps<StatRow>[] = [
  {
    title: "Период",
    dataIndex: "period",
    key: "period",
    render: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    title: "Доход",
    dataIndex: "revenue",
    key: "revenue",
  },
  {
    title: "Кол-во заказов",
    dataIndex: "order_count",
    key: "order_count",
    align: "center",
  },
]

export const RevenueStatisticsTable = () => {
  const [period, setPeriod] = useState<string>("day")
  const [dateRange, setDateRange] = useState<string[] | undefined>()

  const { statistics, isLoading } = useGetRevenueStatisticQuery(
    {
      p_period: period,
      p_from: dateRange?.[0],
      p_to: dateRange?.[1],
    },
    {
      selectFromResult: ({ data, isLoading }) => ({
        statistics: data?.data ?? [],
        isLoading,
      }),
    },
  )

  const handleDateRangeChange = (date: Dayjs, type: "from" | "to") => {
    const currentIndex = type === "from" ? 0 : 1
    if (date) {
      setDateRange((prev) => {
        const newDate = prev ? [...prev] : []

        newDate[currentIndex] = date.format("YYYY-MM-DD")
        return newDate
      })
      setPeriod("day")
    } else {
      setDateRange(undefined)
    }
  }

  const fromDate = dateRange?.[0] ? dayjs(dateRange?.[0]) : undefined
  const toDate = dateRange?.[1] ? dayjs(dateRange?.[1]) : undefined

  return (
    <Flex vertical gap={16} className={classnames.tableWrapper}>
      <Flex gap={12} justify="space-between">
        <Flex vertical>
          <Typography.Title level={5}>Группировать по:</Typography.Title>
          <Select
            value={period}
            onChange={setPeriod}
            options={periodOptions}
            className={classnames.periodSelect}
          />
        </Flex>
        <Flex vertical>
          <Typography.Title level={5}>За период:</Typography.Title>
          <DatePicker
            maxDate={toDate ? toDate : dayjs()}
            value={fromDate}
            size="middle"
            placeholder="От"
            onChange={(date) => handleDateRangeChange(date, "from")}
          />
          <DatePicker
            minDate={fromDate}
            maxDate={dayjs()}
            value={toDate}
            size="middle"
            placeholder="До"
            onChange={(date) => handleDateRangeChange(date, "to")}
          />
        </Flex>
      </Flex>

      <Table<StatRow>
        rowKey={"period"}
        size="small"
        loading={isLoading}
        dataSource={statistics}
        columns={columns}
        pagination={false}
      />
    </Flex>
  )
}
