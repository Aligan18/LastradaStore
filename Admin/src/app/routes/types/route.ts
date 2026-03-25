import type { ItemType } from "antd/es/menu/interface"
import type { RouteProps } from "react-router"
import type { AppRole } from "@shared"

export type RouteAndMenuProps = {
  route: RouteProps
  menu?: Omit<ItemType, "key">
  roles?: AppRole[]
}
