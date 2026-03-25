import type { RootState } from "@app"

export const getUserSelector = (state: RootState) => state.authSlice.user
