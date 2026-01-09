import { configureStore } from "@reduxjs/toolkit"
import { clientApi, productApi, purchaseApi, realizationApi, realizationSlice } from "@modules"

export const store = configureStore({
  reducer: {
    realizationSlice,
    [clientApi.reducerPath]: clientApi.reducer,
    [realizationApi.reducerPath]: realizationApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
  },
  devTools: { name: "Admin RTK store" },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      purchaseApi.middleware,
      realizationApi.middleware,
      clientApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
