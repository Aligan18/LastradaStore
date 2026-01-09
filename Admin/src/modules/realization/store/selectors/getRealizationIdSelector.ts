import type { RootState } from "@app"

export const getRealizationIdSelector = (state: RootState) =>
  state.realizationSlice.form.currentRealizationId
