import { normalizePhone, sendToMessenger } from "@shared"
import { Button, Flex, message, type FormInstance } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
  getMessengerTypeSelector,
  getCurrentAccountSelector,
  getRealizationIdSelector,
} from "../../../store"
import type { CustomerDeliveryFormItems } from "@components"

const DeliveryTemplate = `
Напишите пожалуйста 
ФИО :
Номер телефона : +7
Город :
Адрес доставки :
Почтовый индекс (Если город не Алматы) :
`

const keys: Record<Titles, keyof CustomerDeliveryFormItems> = {
  фио: "client_name",
  номер: "delivery_number",
  город: "city",
  адрес: "address",
  почтовый: "postal_code",
}

type Titles = "фио" | "номер" | "город" | "адрес" | "почтовый"

type ParseDeliveryMessageProps = { form: FormInstance<CustomerDeliveryFormItems> }

export const ParseDeliveryMessage = ({ form }: ParseDeliveryMessageProps) => {
  const messenger = useSelector(getMessengerTypeSelector)
  const currentAccount = useSelector(getCurrentAccountSelector)
  const realizationId = useSelector(getRealizationIdSelector)
  const [parseMessage, setParseMessage] = useState("")

  const handleCopyTemplate = () => {
    if (currentAccount && messenger) {
      sendToMessenger({ type: messenger, account: currentAccount, message: DeliveryTemplate })
    } else {
      try {
        navigator.clipboard.writeText(DeliveryTemplate)
      } catch {
        message.error("Не удалось скопировать шаблон")
      }
    }
  }

  const handleParseMessage = async () => {
    const isTitle = (key: string): key is Titles => {
      return key in keys
    }
    const splittedMessage = parseMessage.split("\n")

    const newValues: Partial<CustomerDeliveryFormItems> = {}

    splittedMessage.map((row: string) => {
      const [key, value] = row.split(":")

      const cleanedKey = key.trim().split(" ")[0].toLocaleLowerCase()
      let cleanedValue = value?.trim()

      if (cleanedKey && cleanedValue) {
        if (isTitle(cleanedKey)) {
          if (cleanedKey === "номер") {
            cleanedValue = normalizePhone(cleanedValue)
          }
          newValues[keys[cleanedKey]] = cleanedValue
        }
      }
    })
    if (realizationId) {
      form.setFieldsValue(newValues)
    }
  }

  return (
    <Flex vertical gap={10}>
      <TextArea
        rows={4}
        value={parseMessage}
        onChange={(event) => {
          setParseMessage(event.target.value)
        }}
        placeholder="Вставьте сообщение из WhatsApp"
      />
      <Flex vertical gap={5}>
        <Button onClick={handleCopyTemplate}>Скопировать пустой шаблон</Button>
        <Button color="primary" variant="outlined" onClick={handleParseMessage}>
          Заполнить форму вставленным текстом
        </Button>
      </Flex>
    </Flex>
  )
}
