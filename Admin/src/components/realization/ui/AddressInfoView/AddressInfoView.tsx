import { Col, Flex, Row, Typography } from "antd"
import type { CustomerDeliveryFormItems } from "../CustomerDeliveryForm/CustomerDeliveryForm"
import type { Realization } from "@modules"

const titleByDeliveryKey: Record<keyof CustomerDeliveryFormItems, string> = {
  client_name: "ФИО",
  delivery_number: "Номер телефона",
  city: "Город",
  postal_code: "Индекс",
  address: "Адрес",
}

const deliveryKeys = Object.keys(titleByDeliveryKey) as (keyof typeof titleByDeliveryKey)[]

type AddressInfoViewProps = {
  realization: Realization
}

export const AddressInfoView = ({ realization }: AddressInfoViewProps) => {
  return deliveryKeys.map((key) => (
    <Row key={key} justify={"space-between"} gutter={20}>
      <Col span={12}>
        <Typography.Text>{titleByDeliveryKey[key]}:</Typography.Text>
      </Col>
      <Col span={12}>
        <Flex justify="end">
          <Typography.Text>{realization[key]}</Typography.Text>
        </Flex>
      </Col>
    </Row>
  ))
}
