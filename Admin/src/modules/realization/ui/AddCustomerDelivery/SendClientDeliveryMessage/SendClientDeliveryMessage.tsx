import { sendToMessenger } from "@shared"
import { Button, message, type FormInstance } from "antd"
import { useSelector } from "react-redux"
import { getCurrentAccountSelector, getMessengerTypeSelector } from "../../../store"
import type { CustomerDeliveryFormItems } from "@components"

type SendClientDeliveryMessageProps = {
  form: FormInstance<CustomerDeliveryFormItems>
}

export const SendClientDeliveryMessage = ({ form }: SendClientDeliveryMessageProps) => {
  const messenger = useSelector(getMessengerTypeSelector)
  const currentAccount = useSelector(getCurrentAccountSelector)

  const handleSendFormToClient = () => {
    const { delivery_number, client_name, city, address, postal_code } = form.getFieldsValue()

    let deliveryMessage = `
    ФИО : ${client_name ?? ""}
    Номер телефона : ${delivery_number ?? ""}
    Город : ${city ?? ""}
    Адрес доставки : ${address ?? ""}
    `
    if (postal_code) {
      deliveryMessage += `Почтовый индекс : ${postal_code}`
    }

    if (currentAccount && messenger) {
      sendToMessenger({ type: messenger, account: currentAccount, message: deliveryMessage })
    } else {
      message.error("Заполните поле телефон")
    }
  }
  return (
    <Button color="primary" variant="outlined" onClick={handleSendFormToClient}>
      Подтвердить данные доставки у клиента{" "}
    </Button>
  )
}
