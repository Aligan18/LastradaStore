import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  clientApi,
  productApi,
  purchaseApi,
  realizationApi,
  realizationSlice,
  statisticsApi,
  authApi,
  authSlice,
  salaryApi,
} from "@modules"

export const store = configureStore({
  reducer: {
    realizationSlice,
    authSlice,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [realizationApi.reducerPath]: realizationApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [salaryApi.reducerPath]: salaryApi.reducer,
  },
  devTools: { name: "Admin RTK store" },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      purchaseApi.middleware,
      realizationApi.middleware,
      clientApi.middleware,
      statisticsApi.middleware,
      authApi.middleware,
      salaryApi.middleware,
    ),
})

// Включаем автоматический refetch при возврате фокуса на вкладку и восстановлении сети
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
