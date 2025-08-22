import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CountryList = string[];

const initialState: CountryList = [
  'Belarus',
  'Finland',
  'Greece',
  'Australia',
  'Argentina',
  'Brazil',
  'Austria',
  'United States',
  'Canada',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'United Kingdom',
  'Poland',
  'Ukraine',
  'Japan',
  'China',
  'India',
];

export const countrySlice = createSlice({
  name: 'countyList',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<string[]>) => {
      state = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
