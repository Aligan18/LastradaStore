import { Table, type TableProps } from "antd"

type CustomTableProps<T> = {} & TableProps<T>

export const CustomTable = <T,>({ ...props }: CustomTableProps<T>) => {
  return <Table<T> {...props} />
}
