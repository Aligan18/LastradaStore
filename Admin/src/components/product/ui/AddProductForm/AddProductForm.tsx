import { Form } from "antd"
import { AddProduct } from "./AddProduct"

type AddProductFormProps = {
  withoutForm?: boolean
}

export const AddProductForm = ({ withoutForm = false }: AddProductFormProps) => {
  return withoutForm ? (
    <AddProduct withGroupName />
  ) : (
    <Form layout="vertical">
      <AddProduct />
    </Form>
  )
}
