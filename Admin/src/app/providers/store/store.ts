import { configureStore } from "@reduxjs/toolkit"
import { productApi, purchaseApi } from "@modules"

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
  },
  devTools: { name: "Admin RTK store" },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, purchaseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
