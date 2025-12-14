import { GridForm, type FormInputs, type FormRowAndCol } from "@shared"
import { Checkbox, DatePicker, Flex, Input, InputNumber } from "antd"

import classes from "./AddPurchaseForm.module.scss"

export type AddPurchaseFormItems = {
  purchase_price: number
  quantity_added: number
  note: string | null
  is_arrived: boolean
  arrival_date: string | null
  purchase_date: string
  total_spent: number
}

type AddPurchaseProps = {
  withGroupName?: boolean
}

export const AddPurchase = ({ withGroupName = false }: AddPurchaseProps) => {
  const groupName = withGroupName ? "purchase" : ""
  const inputs: FormInputs<AddPurchaseFormItems> = {
    purchase_price: {
      rules: [{ required: true }],
      label: "Цена за штуку",
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
    arrival_date: {
      label: "Дата прибытия",
      dependencies: [[groupName, "is_arrived"]],
      input: ({ getFieldValue, resetFields }) => {
        const isArrived = getFieldValue([groupName, "is_arrived"])
        if (isArrived) {
          return <DatePicker className={classes.inputs} />
        }

        resetFields([groupName, "arrival_date"])
        return null
      },
    },
    total_spent: {
      label: "Сумма закупа",
      dependencies: [
        [groupName, "quantity_added"],
        [groupName, "purchase_price"],
      ],
      input: ({ getFieldValue, setFieldValue }) => {
        const quantity = getFieldValue([groupName, "quantity_added"])
        const price = getFieldValue([groupName, "purchase_price"])

        const sum = (quantity ?? 0) * (price ?? 0)

        setFieldValue([groupName, "total_spent"], sum)

        return <Flex>{sum}</Flex>
      },
    },
  }

  const grid: FormRowAndCol<AddPurchaseFormItems>[] = [
    {
      gutter: 30,
      cols: [
        { span: 8, name: "purchase_price" },
        { span: 8, name: "quantity_added" },
        { span: 8, name: "total_spent" },
      ],
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
    {
      cols: [{ name: "arrival_date" }],
    },
  ]

  return <GridForm<AddPurchaseFormItems> groupName={groupName} inputs={inputs} grid={grid} />
}
