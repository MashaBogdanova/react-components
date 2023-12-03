import { createSlice } from '@reduxjs/toolkit';
import { IInputs } from '../types/types';

interface IInitialState {
  data: IInputs[] | null;
  wasDataAdded: boolean;
}

const initialState: IInitialState = {
  data: null,
  wasDataAdded: false,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data ? state.data.unshift(action.payload) : state.data = [action.payload];
    },
    setDataAdded: (state, action) => {
      state.wasDataAdded = action.payload;
    },
  },
});

export const { setData, setDataAdded } = formDataSlice.actions;
export default formDataSlice.reducer;
