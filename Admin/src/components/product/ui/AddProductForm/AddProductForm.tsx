import type { ComponentProps } from "react"
import { AddProduct, type AddProductProps } from "./AddProduct"
import { FormWrapper } from "@shared"
import type { Form } from "antd"

type AddProductFormProps = {
  withoutForm?: boolean
  formProps?: ComponentProps<typeof Form>
} & AddProductProps

export const AddProductForm = ({
  withoutForm = false,
  formProps,
  ...props
}: AddProductFormProps) => (
  <FormWrapper layout="vertical" withoutForm={withoutForm} {...formProps}>
    <AddProduct withGroupName {...props} />
  </FormWrapper>
)
