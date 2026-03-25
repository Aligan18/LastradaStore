import type { RootState } from "@app"

export const getIsAuthenticatedSelector = (state: RootState) =>
  state.authSlice.isAuthenticated
