import type { ReactNode } from "react"
import { StoreProvider } from "./store/StoreProvider"
import { BrowserRouter } from "react-router"
import { LayoutWrapper } from "./layout/LayoutWrapper"
import { ThemeProvider } from "./theme/ThemeProvider"

type AppProviderProps = { children: ReactNode }

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  )
}
