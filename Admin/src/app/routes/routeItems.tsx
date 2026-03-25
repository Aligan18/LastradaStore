import { RoutePath } from "./constants/routePath"
import { routeMap } from "./routeMap"
import { ProtectedRoute } from "./ui/ProtectedRoute"

const configAndPath = Object.entries(routeMap)

export const routeItems = configAndPath.map(([path, config]) => {
  const routePath = path as RoutePath

  if (routePath === RoutePath.LOGIN) {
    return {
      path: routePath,
      ...config.route,
    }
  }

  return {
    path: routePath,
    element: <ProtectedRoute roles={config.roles}>{config.route.element}</ProtectedRoute>,
  }
})
