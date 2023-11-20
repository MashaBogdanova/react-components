import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IItem } from '../../types/types';

export interface IInitialState {
  itemsData: IItem[];
  wasItemsLoaded: boolean;
  currentItemData: IItem | null;
  wasCurrentItemLoaded: boolean;
  isCurrentItemShown: boolean;
}

const initialState: IInitialState = {
  itemsData: [],
  wasItemsLoaded: false,
  currentItemData: null,
  wasCurrentItemLoaded: false,
  isCurrentItemShown: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setAllItems(state, action: PayloadAction<IItem[]>) {
      state.itemsData = action.payload;
    },
    setItemsLoaded(state, action: PayloadAction<boolean>) {
      state.wasItemsLoaded = action.payload;
    },
    setCurrentItem(state, action: PayloadAction<IItem>) {
      state.currentItemData = action.payload;
    },
    setCurrentItemLoaded(state, action: PayloadAction<boolean>) {
      state.wasCurrentItemLoaded = action.payload;
    },
    setCurrentItemShown(state, action: PayloadAction<boolean>) {
      state.isCurrentItemShown = action.payload;
    },
  },
});

export const {
  setAllItems,
  setItemsLoaded,
  setCurrentItem,
  setCurrentItemLoaded,
  setCurrentItemShown,
} = itemsSlice.actions;

export default itemsSlice.reducer;
