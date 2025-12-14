import type { Pagination } from "@shared"
import { Table, type TableProps } from "antd"
import type { Dispatch, SetStateAction } from "react"

type CustomTableProps<T> = { setPagination: Dispatch<SetStateAction<Pagination>> } & TableProps<T>

export const CustomTable = <T,>({ pagination, setPagination, ...props }: CustomTableProps<T>) => {
  return (
    <Table<T>
      pagination={{
        ...pagination,
        onChange: (page) => setPagination((prev) => ({ ...prev, current: page })),
      }}
      {...props}
    />
  )
}
