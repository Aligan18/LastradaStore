import { antdConfig } from "@shared"
import { ConfigProvider } from "antd"
import { type ReactNode } from "react"

type ThemeProviderProps = {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ConfigProvider theme={antdConfig}>{children}</ConfigProvider>
}
