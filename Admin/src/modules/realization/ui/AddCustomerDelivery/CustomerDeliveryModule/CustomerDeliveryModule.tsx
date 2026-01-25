import { CustomerDeliveryForm, type CustomerDeliveryFormItems } from "@components"
import {
  getRealizationIdSelector,
  useGetRealizationByIdQuery,
  useUpdateRealizationMutation,
  useGetClientByAccountQuery,
  deriveAccountByMessenger,
  getMessengerTypeSelector,
  useCreateClientMutation,
  RealizationSteps,
  useGetRealizationItemsQuery,
} from "@modules"
import { Button, Divider, Form, Skeleton, type FormInstance } from "antd"
import { useSelector } from "react-redux"
import type { Clients } from "../../../../client"

import style from "./CustomerDeliveryModule.module.scss"

type CustomerDeliveryModuleProps = {
  form: FormInstance<CustomerDeliveryFormItems>
}

const getInitialForm = (
  data: Pick<Clients, "name" | "delivery_number" | "city" | "address" | "postal_code"> | undefined,
): Partial<CustomerDeliveryFormItems> => {
  if (data) {
    const { name, delivery_number, city, address, postal_code } = data
    return {
      client_name: name,
      delivery_number,
      city,
      address,
      postal_code,
    }
  }
  return {}
}

export const CustomerDeliveryModule = ({ form }: CustomerDeliveryModuleProps) => {
  const realizationId = useSelector(getRealizationIdSelector)
  const [updateRealization] = useUpdateRealizationMutation()
  const messenger = useSelector(getMessengerTypeSelector)

  const [createClient] = useCreateClientMutation()

  const { realization, realizationInitialForm } = useGetRealizationByIdQuery(
    realizationId as number,
    {
      skip: !realizationId,
      selectFromResult: ({ data }) => ({
        realization: data?.data ?? null,
        realizationInitialForm:
          data?.data && getInitialForm({ ...data.data, name: data.data.client_name }),
      }),
    },
  )

  const { realizationItems } = useGetRealizationItemsQuery(
    { id: realizationId as number },
    {
      skip: !realizationId,
      selectFromResult: ({ data }) => ({
        realizationItems: data?.data ?? null,
      }),
    },
  )

  const { client, clientInitialForm, isSuccess } = useGetClientByAccountQuery(
    realization && messenger && deriveAccountByMessenger(realization, messenger, true),
    {
      skip: !realization || !messenger,
      selectFromResult: ({ data, isSuccess }) => ({
        client: data ?? null,
        clientInitialForm: getInitialForm(data),
        isSuccess,
      }),
    },
  )

  const initialForm = realization?.address ? realizationInitialForm : clientInitialForm

  const handleSave = async (values: CustomerDeliveryFormItems) => {
    let client_id = client?.id
    if (!client_id && realization && messenger) {
      const account = deriveAccountByMessenger(realization, messenger, true)

      const { client_name, ...deliveryData } = values
      client_id = (
        await createClient({
          ...deliveryData,
          name: client_name,
          ...account,
        })
      ).data?.id
    }

    const nextStep =
      realizationItems?.length === 0 ? RealizationSteps.ADD_PRODUCTS : RealizationSteps.PAYMENT

    console.log(realizationItems?.length, nextStep)

    if (client_id && realizationId) {
      updateRealization({
        id: realizationId,
        payload: { ...values, client_id, steps: nextStep },
      })
    }
  }

  if (realizationId && !isSuccess) {
    return <Skeleton active />
  }

  return (
    <Form onFinish={handleSave} initialValues={initialForm} layout="vertical" form={form}>
      <CustomerDeliveryForm />
      <Divider size={"middle"} />
      <Button type={"primary"} htmlType="submit" className={style.fullWidth}>
        Сохранить
      </Button>
    </Form>
  )
}
