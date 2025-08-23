import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormDataStore } from '../types/forms';

type FormData = {
  data: FormDataStore[];
};

const initialState: FormData = {
  data: [],
};

export const formDataSlice = createSlice({
  name: 'formDataList',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormDataStore>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
