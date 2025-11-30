import { PurchasePage } from "@pages";
import type { RouteProps } from "react-router";
import { RoutePath } from "./routePath";
import type { ItemType } from "antd/es/menu/interface";

type Props = { route: RouteProps; menu?: Omit<ItemType, "key"> };

const routeMap: Record<RoutePath, Props> = {
  [RoutePath.HOME]: {
    route: {
      element: <></>,
    },
  },
  [RoutePath.PURCHASE]: {
    menu: { label: "Закуп", type: "item" },
    route: {
      element: <PurchasePage />,
    },
  },
  [RoutePath.PRODUCTS]: {
    menu: { label: "Продукты", type: "item" },
    route: {
      element: <div>Products</div>,
    },
  },
};

const configAndPath = Object.entries(routeMap);

export const routeItems = configAndPath.map(([path, config]) => ({
  path: path as RoutePath,
  ...config.route,
}));

export const menuItems = configAndPath
  .filter(([_, config]) => config.menu)
  .map(([path, config]) => ({
    key: path as RoutePath,
    ...config.menu,
  }));
