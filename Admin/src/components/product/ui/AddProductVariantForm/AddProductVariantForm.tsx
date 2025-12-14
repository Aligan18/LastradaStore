import { Form } from "antd"
import { AddProductVariant, type AddProductVariantProps } from "./AddProductVariant"
import { FormWrapper } from "@shared"
import type { ComponentProps } from "react"

type AddProductVariantFormProps = {
  withoutForm?: boolean
  formProps?: ComponentProps<typeof Form>
} & AddProductVariantProps

export const AddProductVariantForm = ({
  withoutForm = false,
  formProps,
  ...props
}: AddProductVariantFormProps) => (
  <FormWrapper layout="vertical" withoutForm={withoutForm} {...formProps}>
    <AddProductVariant withGroupName {...props} />
  </FormWrapper>
)
