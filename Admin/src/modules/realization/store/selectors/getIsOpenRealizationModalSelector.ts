import type { RootState } from "@app"

export const getIsOpenRealizationModalSelector = (state: RootState) =>
  state.realizationSlice.form.isOpenRealizationModal
