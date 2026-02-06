import { Button, Divider, Flex, Typography } from "antd"
import {
  RealizationStatus,
  useGetRealizationByIdQuery,
  useGetRealizationItemsQuery,
  useUpdateRealizationMutation,
} from "../../api"
import { useSelector } from "react-redux"
import {
  getCurrentAccountSelector,
  getRealizationIdSelector,
  getMessengerTypeSelector,
  setIsOpenRealizationModal,
} from "../../store"
import { AddressInfoView, ProductRealizationList } from "@components"
import { calculateTotalPrice } from "../../utils"
import { isCustomApiError, sendToMessenger, useAppDispatch } from "@shared"

export const CheckoutTab = () => {
  const realizationId = useSelector(getRealizationIdSelector)
  const currentMessenger = useSelector(getMessengerTypeSelector)
  const currentAccount = useSelector(getCurrentAccountSelector)
  const [updateRealization, { isLoading, error, isError }] = useUpdateRealizationMutation()
  const dispatch = useAppDispatch()

  const { realization } = useGetRealizationByIdQuery(realizationId as number, {
    skip: !realizationId,
    selectFromResult: ({ data, isSuccess }) => ({
      realization: data?.data ?? null,
      isSuccess,
    }),
  })

  const { realizationItems } = useGetRealizationItemsQuery(
    { id: realizationId as number },
    {
      selectFromResult: ({ data }) => ({
        realizationItems: data?.data ?? [],
      }),
      skip: !realizationId,
    },
  )

  const handleSendCheckout = () => {
    if (realization && realizationItems) {
      const { id, client_name, delivery_number, city, address, postal_code } = realization

      let checkout = `ЗАКАЗ № ${id}

Доставка:
--------------------
ФИО: ${client_name}
Телефон: ${delivery_number}
Город: ${city}
Адрес: ${address}
Индекс: ${postal_code ?? "—"}

Товары:
--------------------
`
      let totalPrice = 0
      realizationItems.forEach(
        ({ products, product_variants, realization_price, realization_quantity, note }, index) => {
          const isOtherProduct = products.id === 25
          const productTitle = isOtherProduct
            ? `${index + 1}) ${note}`
            : `${index + 1}) ${products.name} | ${product_variants.colors.name} | ${product_variants.size}`
          checkout += `${productTitle}
${realization_price} тг x ${realization_quantity} = ${realization_price * realization_quantity} тг

`

          totalPrice += realization_price * realization_quantity
        },
      )

      checkout += `--------------------
Итого: ${totalPrice}
      `

      if (currentMessenger && currentAccount) {
        sendToMessenger({ type: currentMessenger, account: currentAccount, message: checkout })
      }
    }
  }

  const handleApprovePayment = async () => {
    if (realizationId) {
      const response = await updateRealization({
        id: realizationId,
        payload: { status: RealizationStatus.PACKAGE },
      })

      if (!response.error) {
        dispatch(setIsOpenRealizationModal(false))
      }
    }
  }

  return (
    <Flex vertical justify="center" gap={5}>
      {realization && <AddressInfoView realization={realization} />}
      <Divider size="middle" />
      <ProductRealizationList realizationItems={realizationItems} />
      <Divider size="middle" />
      <Flex justify="space-between">
        <Typography.Title level={5}>Общая сумма:</Typography.Title>
        <Typography.Title level={5} type="success">
          {calculateTotalPrice(realizationItems)} тг
        </Typography.Title>
      </Flex>
      <Button onClick={handleSendCheckout}> Отправить чек клиенту </Button>
      <Divider size="middle" />
      {isError && isCustomApiError(error) && (
        <Typography.Text type={"danger"}>
          {error.message}:
          <br />
          {error.details?.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </Typography.Text>
      )}
      <Button type="primary" onClick={handleApprovePayment} disabled={isLoading}>
        Подтвердить оплату
      </Button>
    </Flex>
  )
}
