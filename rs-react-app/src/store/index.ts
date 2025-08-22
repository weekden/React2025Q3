import { configureStore } from '@reduxjs/toolkit';
import FormDataReducer from './formSlice';
import CountriesReducer from './countrySlice';

export const store = configureStore({
  reducer: {
    formData: FormDataReducer,
    countries: CountriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
