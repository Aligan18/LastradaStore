import type { ReactNode } from "react"
import { StoreProvider } from "./store/StoreProvider"
import { BrowserRouter } from "react-router"
import { LayoutWrapper } from "./layout/LayoutWrapper"
import { ThemeProvider } from "./theme/ThemeProvider"
import { AuthProvider } from "./auth/AuthProvider"

type AppProviderProps = { children: ReactNode }

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StoreProvider>
  )
}
