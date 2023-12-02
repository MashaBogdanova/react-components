import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formData from './formDataSlice';

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  formData,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
