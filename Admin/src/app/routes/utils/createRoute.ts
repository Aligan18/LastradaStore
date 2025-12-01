import type { ReactNode } from "react";
import type { RouteAndMenuProps } from "../types/route";

type CreateRouteParams = {
  element: ReactNode;
  menuLabel?: string;
};

export const createRoute = ({
  element,
  menuLabel,
}: CreateRouteParams): RouteAndMenuProps => {
  return {
    route: { element },
    menu: menuLabel ? { label: menuLabel, type: "item" } : undefined,
  };
};
