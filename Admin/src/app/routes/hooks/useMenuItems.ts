import { useMemo } from "react"
import { useSelector } from "react-redux"
import { getRolesSelector } from "@modules"
import type { AppRole } from "@shared"
import type { RoutePath } from "../constants/routePath"
import { routeMap } from "../routeMap"

const hasAccess = (userRoles: AppRole[], requiredRoles?: AppRole[]) => {
  if (!requiredRoles || requiredRoles.length === 0) return true
  return requiredRoles.some((role) => userRoles.includes(role))
}

export const useMenuItems = () => {
  const userRoles = useSelector(getRolesSelector)

  return useMemo(() => {
    return Object.entries(routeMap)
      .filter(([_, config]) => config.menu && hasAccess(userRoles, config.roles))
      .map(([path, config]) => ({
        key: path as RoutePath,
        ...config.menu,
      }))
  }, [userRoles])
}
