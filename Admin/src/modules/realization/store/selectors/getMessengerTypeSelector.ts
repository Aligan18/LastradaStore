import type { RootState } from "@app"

export const getMessengerTypeSelector = (state: RootState) => state.realizationSlice.form.messenger
