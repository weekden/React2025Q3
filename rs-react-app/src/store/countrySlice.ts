import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { countryList } from '../config/formConfig';

type CountryList = string[];

export const initialState: CountryList = countryList;

export const countrySlice = createSlice({
  name: 'countyList',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<string[]>) => {
      return (state = action.payload);
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
