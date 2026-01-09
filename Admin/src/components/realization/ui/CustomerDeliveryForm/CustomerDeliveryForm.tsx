import { GridForm, PhoneInput, type FormInputs, type FormRowAndCol } from "@shared"
import { Input } from "antd"

export type CustomerDeliveryFormItems = {
  client_name: string | null
  delivery_number: string | null
  city: string | null
  address: string | null
  postal_code: string | null
}

const formGrid: FormRowAndCol<CustomerDeliveryFormItems>[] = [
  { cols: [{ name: "client_name" }] },
  { cols: [{ name: "delivery_number" }] },
  { cols: [{ name: "city" }] },
  { cols: [{ name: "address" }] },
  { cols: [{ name: "postal_code" }] },
]

export const CustomerDeliveryForm = () => {
  const inputs: FormInputs<CustomerDeliveryFormItems> = {
    client_name: { input: <Input placeholder="ФИО" />, rules: [{ required: true }] },
    delivery_number: {
      input: <PhoneInput name="delivery_number" />,
    },
    address: { input: <Input placeholder="Адрес" />, rules: [{ required: true }] },
    city: { input: <Input placeholder="Город" />, rules: [{ required: true }] },
    postal_code: { input: <Input placeholder="Почтовый индекс" /> },
  }

  return <GridForm<CustomerDeliveryFormItems> inputs={inputs} grid={formGrid} />
}
