import type { RootState } from "@app"

export const getCurrentAccountSelector = (state: RootState) =>
  state.realizationSlice.form.currentAccount
