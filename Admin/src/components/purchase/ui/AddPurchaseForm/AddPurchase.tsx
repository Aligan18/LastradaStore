import { GridForm, type FormInputs, type FormRowAndCol } from "@shared"
import { Checkbox, DatePicker, Input, InputNumber } from "antd"

import classes from "./AddPurchaseForm.module.scss"

export type AddPurchaseFormItems = {
  purchase_price: number
  quantity_added: number
  note: string | null
  is_arrived: boolean
  purchase_date: string
}

type AddPurchaseProps = {
  withGroupName?: boolean
}

export const AddPurchase = ({ withGroupName = false }: AddPurchaseProps) => {
  const groupName = withGroupName ? "purchase" : ""
  const inputs: FormInputs<AddPurchaseFormItems> = {
    purchase_price: {
      rules: [{ required: true }],
      label: "Цена закупа за штуку",
      input: <InputNumber min={1} className={classes.inputs} />,
    },
    quantity_added: {
      rules: [{ required: true }],
      label: "Количество",
      input: <InputNumber min={1} className={classes.inputs} />,
    },
    note: {
      initialValue: null,
      label: "Примечание",
      input: <Input.TextArea />,
    },
    is_arrived: {
      layout: "horizontal",
      initialValue: false,
      valuePropName: "checked",
      label: "Товар прибыл",
      input: <Checkbox className={classes.inputs} />,
    },
    purchase_date: {
      label: "Дата заказа",
      input: <DatePicker className={classes.inputs} />,
    },
  }

  const grid: FormRowAndCol<AddPurchaseFormItems>[] = [
    {
      cols: [{ name: "purchase_price" }],
    },
    {
      cols: [{ name: "quantity_added" }],
    },
    {
      cols: [{ name: "purchase_date" }],
    },
    {
      cols: [{ name: "note" }],
    },
    {
      cols: [{ name: "is_arrived" }],
    },
  ]

  return <GridForm<AddPurchaseFormItems> groupName={groupName} inputs={inputs} grid={grid} />
}
