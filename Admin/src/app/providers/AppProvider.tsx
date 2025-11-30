import type { ReactNode } from "react";
import { StoreProvider } from "./store/StoreProvider";
import { BrowserRouter } from "react-router";
import { LayoutWrapper } from "./layout/LayoutWrapper";

type AppProviderProps = { children: ReactNode };

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <LayoutWrapper>{children}</LayoutWrapper>
      </BrowserRouter>
    </StoreProvider>
  );
};
