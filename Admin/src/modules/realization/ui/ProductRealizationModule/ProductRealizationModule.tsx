import { ProductRealizationList } from "@components"
import {
  useDeleteRealizationItemsMutation,
  useGetRealizationItemsQuery,
  useUpdateRealizationItemsMutation,
} from "../../api"
import { Divider, Flex, Typography } from "antd"
import { useDebounce } from "@shared"
import { calculateTotalPrice } from "../../utils"

type ProductRealizationModuleProps = {
  realizationId: number | null
}

export const ProductRealizationModule = ({ realizationId }: ProductRealizationModuleProps) => {
  const [updateRealizationItems] = useUpdateRealizationItemsMutation()
  const [deleteRealizationItems] = useDeleteRealizationItemsMutation()

  const { realizationItems } = useGetRealizationItemsQuery(
    { id: realizationId as number },
    {
      selectFromResult: ({ data }) => ({
        realizationItems: data?.data ?? [],
      }),
      skip: !realizationId,
    },
  )

  const handleChangeQuantity = ({
    id,
    newQuantity,
    newEarned,
  }: {
    id: number
    newQuantity: number
    newEarned: number
  }) => {
    if (newQuantity > 0)
      updateRealizationItems({
        id,
        payload: { earned: newEarned, realization_quantity: newQuantity },
      })
  }

  const debounceChangeQuantity = useDebounce(handleChangeQuantity, 100)

  const handleDeleteProduct = (id: number) => {
    deleteRealizationItems(id)
  }

  return (
    <Flex vertical>
      <ProductRealizationList
        onDeleteProduct={handleDeleteProduct}
        onChangeQuantity={debounceChangeQuantity}
        realizationItems={realizationItems}
      />
      <Divider size="small" />
      <Flex justify="space-between">
        <Typography.Title level={5}>Общая сумма:</Typography.Title>
        <Typography.Title level={5} type="success">
          {calculateTotalPrice(realizationItems)} тг
        </Typography.Title>
      </Flex>
    </Flex>
  )
}
