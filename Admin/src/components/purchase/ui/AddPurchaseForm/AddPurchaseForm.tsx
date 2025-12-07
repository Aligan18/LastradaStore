import { type ComponentProps } from "react"
import { AddPurchase } from "./AddPurchase"
import { FormWrapper } from "@shared"
import type { Form } from "antd"

type AddPurchaseFormProps = {
  withoutForm?: boolean
  formProps?: ComponentProps<typeof Form>
}

export const AddPurchaseForm = ({
  withoutForm = false,
  formProps,
  ...props
}: AddPurchaseFormProps) => {
  return (
    <FormWrapper layout="vertical" withoutForm={withoutForm} {...formProps}>
      <AddPurchase withGroupName {...props} />
    </FormWrapper>
  )
}
