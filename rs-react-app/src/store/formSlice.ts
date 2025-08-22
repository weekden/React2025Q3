import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormDataValues } from '../types/forms';

type FormData = {
  data: FormDataValues[];
};

const initialState: FormData = {
  data: [],
};

export const formDataSlice = createSlice({
  name: 'formDataList',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormDataValues>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
