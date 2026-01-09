import type { RealizationItems } from "../api"

export const calculateTotalPrice = (realizationItems: RealizationItems[]) => {
  return realizationItems.reduce((acc, current) => {
    return (acc += current.realization_price * current.realization_quantity)
  }, 0)
}
