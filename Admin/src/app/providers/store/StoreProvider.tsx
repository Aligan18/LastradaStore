import { Provider } from "react-redux"
import { store } from "./store"
import type { ReactNode } from "react"

type StoreProviderProps = { children: ReactNode }

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}
