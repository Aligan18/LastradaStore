import { Flex, Select, Typography } from "antd"
import { useState } from "react"

import style from "./style.module.scss"
import type { DefaultOptionType, SelectProps } from "antd/es/select"

type CustomSelectProps = { label?: string; options: DefaultOptionType[] } & SelectProps

export const CustomSelect = ({ label, options, ...props }: CustomSelectProps) => {
  const [open, setOpen] = useState(false)

  const handleSelect: SelectProps["onSelect"] = (value, option) => {
    if (props.onSelect) props.onSelect(value, option)
    setOpen(false)
    setTimeout(() => {
      ;(document.activeElement as HTMLElement)?.blur()
    }, 0)
  }

  return (
    <Flex gap={8} orientation="vertical">
      <Typography.Text>{label} </Typography.Text>
      <Select
        open={open}
        onOpenChange={setOpen}
        onSelect={handleSelect}
        options={options}
        className={style.select}
        {...props}
      />
    </Flex>
  )
}
