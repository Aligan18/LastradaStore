import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { getIsAuthenticatedSelector, getRolesSelector } from "@modules"
import type { AppRole } from "@shared"
import { RoutePath } from "../constants/routePath"
import type { ReactNode } from "react"

type ProtectedRouteProps = {
  children: ReactNode
  roles?: AppRole[]
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector)
  const userRoles = useSelector(getRolesSelector)

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.LOGIN} replace />
  }

  if (roles && roles.length > 0) {
    const hasAccess = roles.some((role) => userRoles.includes(role))
    if (!hasAccess) {
      return <Navigate to={RoutePath.DELIVERY} replace />
    }
  }

  return <>{children}</>
}
