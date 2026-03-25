import type { ReactNode } from "react"
import type { AppRole } from "@shared"
import type { RouteAndMenuProps } from "../types/route"

type CreateRouteParams = {
  element: ReactNode
  menuLabel?: string
  roles?: AppRole[]
}

export const createRoute = ({
  element,
  menuLabel,
  roles,
}: CreateRouteParams): RouteAndMenuProps => {
  return {
    route: { element },
    menu: menuLabel ? { label: menuLabel, type: "item" } : undefined,
    roles,
  }
}
