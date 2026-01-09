import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { MESSENGER } from "../api"

type RealizationState = {
  form: {
    currentRealizationId: number | null
    isOpenRealizationModal: boolean
    messenger: MESSENGER | null
    currentAccount: string | null
  }
}

const initialState: RealizationState = {
  form: {
    currentRealizationId: null,
    isOpenRealizationModal: false,
    messenger: null,
    currentAccount: null,
  },
}

const realization = createSlice({
  name: "realization",
  initialState,
  reducers: {
    setMessengerType(state, action: PayloadAction<MESSENGER>) {
      state.form.messenger = action.payload
    },

    setCurrentRealizationId(state, action: PayloadAction<number | null>) {
      state.form.currentRealizationId = action.payload
    },
    resetCurrentRealization(state) {
      state.form.currentRealizationId = null
    },
    setIsOpenRealizationModal(state, action: PayloadAction<boolean>) {
      state.form.isOpenRealizationModal = action.payload
    },
    setCurrentAccount(state, action: PayloadAction<string | null>) {
      state.form.currentAccount = action.payload
    },
    resetFormFields(state) {
      state.form = initialState.form
    },
  },
})

export const {
  setCurrentRealizationId,
  resetCurrentRealization,
  setIsOpenRealizationModal,
  setMessengerType,
  setCurrentAccount,
  resetFormFields,
} = realization.actions
export const realizationSlice = realization.reducer
