import { Form } from "antd"
import { AddProductVariant } from "./AddProductVariant"

type AddProductVariantFormProps = {
  withoutForm?: boolean
}

export const AddProductVariantForm = ({ withoutForm }: AddProductVariantFormProps) => {
  return withoutForm ? (
    <AddProductVariant withGroupName />
  ) : (
    <Form layout="vertical">
      <AddProductVariant />
    </Form>
  )
}
