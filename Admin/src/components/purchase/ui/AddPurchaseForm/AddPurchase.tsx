import { GridForm, type FormInputs, type FormRowAndCol } from "@shared"
import { InputNumber } from "antd"

import classes from "./AddPurchaseForm.module.scss"

type FormItems = {
  purchase_price: number
  quantity_added: number
}

type AddPurchaseProps = {
  withGroupName?: boolean
}

export const AddPurchase = ({ withGroupName = false }: AddPurchaseProps) => {
  const groupName = withGroupName ? "product_variants" : ""
  const inputs: FormInputs<FormItems> = {
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
  }

  const grid: FormRowAndCol<FormItems>[] = [
    {
      cols: [{ name: "purchase_price" }],
    },
    {
      cols: [{ name: "quantity_added" }],
    },
  ]

  return <GridForm groupName={groupName} inputs={inputs} grid={grid} />
}
