import { Flex, Select, Typography } from "antd"

import style from "./style.module.scss"
import type { DefaultOptionType, SelectProps } from "antd/es/select"

type CustomSelectProps = { label?: string; options: DefaultOptionType[] } & SelectProps

export const CustomSelect = ({ label, options, ...props }: CustomSelectProps) => {
  return (
    <Flex gap={8} orientation="vertical">
      <Typography.Text>{label} </Typography.Text>
      <Select options={options} className={style.select} {...props} />
    </Flex>
  )
}
