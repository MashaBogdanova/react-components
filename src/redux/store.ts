import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import items from './slices/itemsSlice';

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

const rootReducer = combineReducers({
  items,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export const store = setupStore();
