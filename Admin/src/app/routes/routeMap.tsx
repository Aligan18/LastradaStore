import { PurchasePage } from "@pages";
import { RoutePath } from "./constants/routePath";
import { createRoute } from "./utils/createRoute";
import type { RouteAndMenuProps } from "./types/route";

type RouteMap = Record<RoutePath, RouteAndMenuProps>;

export const routeMap: RouteMap = {
  [RoutePath.HOME]: createRoute({
    element: <></>,
  }),

  [RoutePath.PURCHASE]: createRoute({
    element: <PurchasePage />,
    menuLabel: "Закуп",
  }),

  [RoutePath.PRODUCTS]: createRoute({
    element: <div>Products</div>,
    menuLabel: "Продукты",
  }),
};
