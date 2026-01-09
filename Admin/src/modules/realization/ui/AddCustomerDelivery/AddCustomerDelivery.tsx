import { Divider, Flex, Form } from "antd"
import { ParseDeliveryMessage } from "./ParseDeliveryMessage/ParseDeliveryMessage"
import { SendClientDeliveryMessage } from "./SendClientDeliveryMessage/SendClientDeliveryMessage"
import { CustomerDeliveryModule } from "./CustomerDeliveryModule/CustomerDeliveryModule"
import type { CustomerDeliveryFormItems } from "@components"

export const AddCustomerDelivery = () => {
  const [form] = Form.useForm<CustomerDeliveryFormItems>()

  return (
    <Flex orientation="vertical" justify="flex-start" gap={10}>
      <ParseDeliveryMessage form={form} />
      <Divider size="middle" />
      <CustomerDeliveryModule form={form} />
      <SendClientDeliveryMessage form={form} />
    </Flex>
  )
}
