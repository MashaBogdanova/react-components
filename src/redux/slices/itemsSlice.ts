import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/types';

export interface IInitialState {
  data: IItem[];
}

const initialState: IInitialState = { data: [] };

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setAllItems(state, action: PayloadAction<IItem[]>) {
      state.data = action.payload;
    },
  },
});

export const { setAllItems } = itemsSlice.actions;

export default itemsSlice.reducer;
