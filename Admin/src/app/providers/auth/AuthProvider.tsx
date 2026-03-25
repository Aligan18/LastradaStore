import { useEffect, type ReactNode } from "react"
import { useSelector } from "react-redux"
import { supabase, useAppDispatch } from "@shared"
import {
  setUser,
  setRoles,
  setAuthLoading,
  logout,
  getAuthLoadingSelector,
  useLazyGetUserRolesQuery,
} from "@modules"
import { Spin, Flex, message } from "antd"

type AuthProviderProps = { children: ReactNode }

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getAuthLoadingSelector)
  const [triggerGetUserRoles] = useLazyGetUserRolesQuery()

  useEffect(() => {
    let isInitializing = true

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          dispatch(setUser(session.user))
          try {
            const roles = await triggerGetUserRoles({ userId: session.user.id }).unwrap()
            dispatch(setRoles(roles.map((r) => r.role)))
          } catch {
            dispatch(setRoles([]))
          }
        }
      } catch {
        message.error("Ошибка при попытке войти в аккаунт")
      } finally {
        isInitializing = false
        dispatch(setAuthLoading(false))
      }
    }

    initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION" || isInitializing) {
        return
      }

      if (event === "SIGNED_IN" && session?.user) {
        dispatch(setUser(session.user))
        try {
          const roles = await triggerGetUserRoles({ userId: session.user.id }).unwrap()
          dispatch(setRoles(roles.map((r) => r.role)))
        } catch {
          dispatch(setRoles([]))
        }
      } else if (event === "SIGNED_OUT") {
        dispatch(logout())
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch, triggerGetUserRoles])

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Spin size="large" />
      </Flex>
    )
  }

  return <>{children}</>
}
