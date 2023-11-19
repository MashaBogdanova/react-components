import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/types';

export interface IInitialState {
  itemsData: IItem[];
  currentItemData: IItem | null;
}

const initialState: IInitialState = { itemsData: [], currentItemData: null };

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setAllItems(state, action: PayloadAction<IItem[]>) {
      state.itemsData = action.payload;
    },
    setCurrentItem(state, action: PayloadAction<IItem>) {
      state.currentItemData = action.payload;
    },
  },
});

export const { setAllItems, setCurrentItem } = itemsSlice.actions;

export default itemsSlice.reducer;
