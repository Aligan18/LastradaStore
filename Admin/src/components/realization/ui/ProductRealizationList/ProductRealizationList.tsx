import { Counter } from "@shared"
import { List } from "antd"

import type { FullRealizationItems } from "src/modules/realization/api"

type ProductRealizationListProps = {
  realizationItems: FullRealizationItems[]
  onDeleteProduct?: (id: number) => void
  onChangeQuantity?: ({
    id,
    newQuantity,
  }: {
    id: number
    newQuantity: number
    newEarned: number
  }) => void
}

export const ProductRealizationList = ({
  realizationItems,
  onChangeQuantity,
  onDeleteProduct,
}: ProductRealizationListProps) => {
  console.log(realizationItems[0].products.name)
  return (
    <List
      itemLayout="horizontal"
      dataSource={realizationItems}
      renderItem={({ id, products, realization_price, product_variants, realization_quantity }) => (
        <List.Item
          key={id}
          actions={[
            onChangeQuantity ? (
              <Counter
                onDelete={() => onDeleteProduct && onDeleteProduct(id)}
                count={realization_quantity}
                onChange={(newQuantity: number) =>
                  onChangeQuantity({ id, newQuantity, newEarned: newQuantity * realization_price })
                }
              />
            ) : (
              `${realization_quantity} шт`
            ),
          ]}>
          <List.Item.Meta
            title={`${products.id} | ${products.name} | ${product_variants.colors.name} | ${product_variants.size}`}
            description={`${realization_price} тг`}
          />
        </List.Item>
      )}
    />
  )
}
