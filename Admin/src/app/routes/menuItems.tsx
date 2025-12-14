import type { RoutePath } from "./constants/routePath"
import { routeMap } from "./routeMap"

const configAndPath = Object.entries(routeMap)

export const menuItems = configAndPath
  .filter(([_, config]) => config.menu)
  .map(([path, config]) => ({
    key: path as RoutePath,
    ...config.menu,
  }))
