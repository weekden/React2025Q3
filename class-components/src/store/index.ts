import { configureStore } from '@reduxjs/toolkit';
import checkCardsReducer from './cardsSlice';
import { zeldaApi } from './apiSlice';
const store = configureStore({
  reducer: {
    checkCards: checkCardsReducer,
    [zeldaApi.reducerPath]: zeldaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(zeldaApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
