import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppRole } from "@shared"
import type { User } from "@supabase/supabase-js"

type AuthSliceState = {
  user: User | null
  roles: AppRole[]
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthSliceState = {
  user: null,
  roles: [],
  isAuthenticated: false,
  isLoading: true,
}

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    setRoles(state, action: PayloadAction<AppRole[]>) {
      state.roles = action.payload
    },
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    logout(state) {
      state.user = null
      state.roles = []
      state.isAuthenticated = false
      state.isLoading = false
    },
  },
})

export const { setUser, setRoles, setAuthLoading, logout } = auth.actions
export const authSlice = auth.reducer
