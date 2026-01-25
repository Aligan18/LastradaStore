import { DeliveryPage, PurchasePage, RealizationHistoryPage, RealizationPage } from "@pages"
import { RoutePath } from "./constants/routePath"
import { createRoute } from "./utils/createRoute"
import type { RouteAndMenuProps } from "./types/route"

type RouteMap = Record<RoutePath, RouteAndMenuProps>

export const routeMap: RouteMap = {
  [RoutePath.REALIZATION]: createRoute({
    element: <RealizationPage />,
    menuLabel: "Продажи",
  }),

  [RoutePath.DELIVERY]: createRoute({
    element: <DeliveryPage />,
    menuLabel: "Доставка",
  }),

  [RoutePath.PURCHASE]: createRoute({
    element: <PurchasePage />,
    menuLabel: "Закуп",
  }),
  [RoutePath.PRODUCTS]: createRoute({
    element: <div>Products</div>,
  }),
  [RoutePath.REALIZATION_HISTORY]: createRoute({
    element: <RealizationHistoryPage />,
    menuLabel: "История заказов",
  }),
}
