import { AddProductToRealization, type AddProductToRealizationFormItems } from "@components"
import { Button, Flex, Form } from "antd"

import { useCreateRealizationItemsMutation } from "../../api"
import { ArrowDownOutlined } from "@ant-design/icons"
import { OTHER_PRODUCT_ID, OTHER_VARIANT_ID } from "@shared"

type AddProductToRealizationFormProps = {
  realizationId: number | null
}

export const AddProductToRealizationForm = ({
  realizationId,
}: AddProductToRealizationFormProps) => {
  const [form] = Form.useForm()

  const [addProductToRealization] = useCreateRealizationItemsMutation()

  const handleSubmit = async (formData: AddProductToRealizationFormItems) => {
    if (realizationId) {
      const currentFromData =
        formData.product_id === OTHER_PRODUCT_ID
          ? { ...formData, product_variant_id: OTHER_VARIANT_ID }
          : formData
      await addProductToRealization({ ...currentFromData, realization_id: realizationId })
      form.resetFields()
    }
  }
  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Flex vertical justify="flex-start">
        <AddProductToRealization form={form} />
        <Button type="primary" htmlType="submit">
          Добавить <ArrowDownOutlined />
        </Button>
      </Flex>
    </Form>
  )
}
