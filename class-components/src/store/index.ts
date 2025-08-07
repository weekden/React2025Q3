import { configureStore } from '@reduxjs/toolkit';
import checkCardsReducer from './cardsSlice';
const store = configureStore({
  reducer: {
    checkCards: checkCardsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
