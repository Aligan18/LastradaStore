import type { ItemType } from "antd/es/menu/interface"
import type { RouteProps } from "react-router"

export type RouteAndMenuProps = {
  route: RouteProps
  menu?: Omit<ItemType, "key">
}
