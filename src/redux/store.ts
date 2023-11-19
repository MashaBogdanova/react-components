import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import items from './slices/itemsSlice';
import searchParams from './slices/searchParamsSlice';
import error from './slices/errorSlice';

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

const rootReducer = combineReducers({
  items,
  searchParams,
  error,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
