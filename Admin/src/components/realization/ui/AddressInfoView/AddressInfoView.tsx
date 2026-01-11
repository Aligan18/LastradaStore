import { Button, Col, Flex, message, Row, Typography } from "antd"
import type { CustomerDeliveryFormItems } from "../CustomerDeliveryForm/CustomerDeliveryForm"
import type { Realization } from "@modules"
import { CopyOutlined } from "@ant-design/icons"

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
  withCopy?: boolean
}

export const AddressInfoView = ({ realization, withCopy = false }: AddressInfoViewProps) => {
  const handleCopy = (text: string | null) => {
    if (text) {
      try {
        navigator.clipboard.writeText(text)
        message.success("Скопировано")
      } catch {
        message.error("Не удалось скопировать")
      }
    } else {
      message.error("Не удалось скопировать")
    }
  }

  return deliveryKeys.map((key) => (
    <Row key={key} justify={"space-between"} gutter={25}>
      <Col span={10}>
        <Typography.Text>{titleByDeliveryKey[key]}:</Typography.Text>
      </Col>
      <Col span={14}>
        <Flex justify="end" align="center" gap={10}>
          <Typography.Text>{realization[key]}</Typography.Text>
          {withCopy && (
            <Button onClick={() => handleCopy(realization[key])}>
              <CopyOutlined />
            </Button>
          )}
        </Flex>
      </Col>
    </Row>
  ))
}
