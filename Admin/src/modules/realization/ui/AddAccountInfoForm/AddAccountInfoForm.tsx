import { InstagramInput, PhoneInput, useAppDispatch } from "@shared"
import { Button, Divider, Flex, Form, Skeleton, Typography } from "antd"
import { setCurrentAccount, setCurrentRealizationId, setMessengerType } from "../../store/slice"
import {
  MessengerTypes,
  useCreateRealizationMutation,
  useGetRealizationByIdQuery,
  useUpdateRealizationMutation,
  type Realization,
} from "../../api"
import { useSelector } from "react-redux"
import { getRealizationIdSelector } from "../../store"
import { deriveAccountByMessenger } from "../../utils"

type FieldsItems = {
  whats_app_account: string
  instagram_account: string
}

const getInitialForm = (data: Realization | undefined) => {
  if (data) {
    const { instagram_account, whats_app_account } = data
    return {
      instagram_account: instagram_account ?? undefined,
      whats_app_account: whats_app_account ?? undefined,
    }
  }
  return { instagram_account: undefined, whats_app_account: undefined }
}

export const AddAccountInfoForm = () => {
  const dispatch = useAppDispatch()
  const [createRealization] = useCreateRealizationMutation()
  const [updateRealization] = useUpdateRealizationMutation()
  const realizationId = useSelector(getRealizationIdSelector)

  const { initialForm, isSuccess } = useGetRealizationByIdQuery(realizationId as number, {
    skip: !realizationId,
    selectFromResult: ({ data, isSuccess }) => ({
      realization: data?.data ?? null,
      initialForm: getInitialForm(data?.data),
      isSuccess,
    }),
  })

  const [form] = Form.useForm<FieldsItems>()

  const instagram_account = Form.useWatch("instagram_account", form)
  const whats_app_account = Form.useWatch("whats_app_account", form)

  const handleChangeAccount = async () => {
    const values = form.getFieldsValue()

    const currentMessengerType = !values.instagram_account
      ? MessengerTypes.WHATS_APP
      : MessengerTypes.INSTAGRAM

    const currentAccount = deriveAccountByMessenger(values, currentMessengerType)

    dispatch(setMessengerType(currentMessengerType))
    dispatch(setCurrentAccount(currentAccount))

    if (!realizationId) {
      const newRealizationId =
        (await createRealization({ ...values, messenger: currentMessengerType })).data?.data.id ??
        null
      dispatch(setCurrentRealizationId(newRealizationId))
    } else {
      updateRealization({
        id: realizationId,
        payload: { ...values, messenger: currentMessengerType },
      })
    }
  }

  if (realizationId && !isSuccess) {
    return <Skeleton active />
  }

  return (
    <Form<FieldsItems> form={form} initialValues={initialForm} layout="vertical">
      <Flex vertical gap={10}>
        <Typography.Title level={5}>Клиент пишет через: </Typography.Title>
        <Flex vertical>
          <PhoneInput
            disabled={!!instagram_account}
            name="whats_app_account"
            formItemProps={{ label: "WhatsApp" }}
          />
          <Divider size="middle" />
          <InstagramInput disabled={!!whats_app_account} formItemProps={{ label: "Instagram" }} />
        </Flex>
        <Button type="primary" onClick={handleChangeAccount}>
          Сохранить
        </Button>
      </Flex>
    </Form>
  )
}
