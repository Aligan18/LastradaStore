import type { RootState } from "@app"

export const getAuthLoadingSelector = (state: RootState) => state.authSlice.isLoading
