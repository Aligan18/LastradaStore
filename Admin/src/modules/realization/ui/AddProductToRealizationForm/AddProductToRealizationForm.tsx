import { AddProductToRealization, type AddProductToRealizationFormItems } from "@components"
import { Button, Flex, Form } from "antd"

import { useCreateRealizationItemsMutation } from "../../api"
import { ArrowDownOutlined } from "@ant-design/icons"

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
      await addProductToRealization({ ...formData, realization_id: realizationId })
      form.resetFields()
    }
  }
  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Flex vertical justify="flex-start">
        <AddProductToRealization />
        <Button type="primary" htmlType="submit">
          Добавить <ArrowDownOutlined />
        </Button>
      </Flex>
    </Form>
  )
}
