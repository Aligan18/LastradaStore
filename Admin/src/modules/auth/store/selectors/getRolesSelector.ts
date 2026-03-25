import type { RootState } from "@app"

export const getRolesSelector = (state: RootState) => state.authSlice.roles
