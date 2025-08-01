import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../types/api';

type ChechedCardState = {
  list: Character[];
};

const initialState: ChechedCardState = {
  list: [],
};

export const checkCardsSlice = createSlice({
  name: 'checkCardList',
  initialState,
  reducers: {
    toggleCard(state, action: PayloadAction<Character>) {
      const index = state.list.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.list.push({ ...action.payload, isChecked: true });
      } else {
        state.list.splice(index, 1);
      }
    },

    clearSelection(state) {
      state.list = [];
    },
  },
});

export const { toggleCard, clearSelection } = checkCardsSlice.actions;
export default checkCardsSlice.reducer;
