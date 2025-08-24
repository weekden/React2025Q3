import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { countryList } from '../config/formConfig';

type CountryList = string[];

export const initialState: CountryList = countryList;

export const countrySlice = createSlice({
  name: 'countyList',
  initialState,
  reducers: {
    setCountry: (_state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
