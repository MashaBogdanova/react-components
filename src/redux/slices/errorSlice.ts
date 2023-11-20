import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialState {
  isError: boolean;
}

const initialState: IInitialState = { isError: false };

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
