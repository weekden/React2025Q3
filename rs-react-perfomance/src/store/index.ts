import { configureStore } from '@reduxjs/toolkit';
import searchCountryReducer from './slicers/countrySlicer';
import yearReducer from './slicers/yearSlicer';
import sortReducer from './slicers/sortSlicer';
import fieldsReducer from './slicers/fieldsSlicer';

export const store = configureStore({
  reducer: {
    country: searchCountryReducer,
    year: yearReducer,
    sort: sortReducer,
    fields: fieldsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
