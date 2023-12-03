import { createSlice } from '@reduxjs/toolkit';
import { IInputs } from '../types/types';

interface IInitialState {
  data: IInputs[] | null;
  RHFData: IInputs[] | null;
  wasDataAdded: boolean;
}

const initialState: IInitialState = {
  data: null,
  RHFData: null,
  wasDataAdded: false,
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data?.push(action.payload);
    },
    setRHFData: (state, action) => {
      state.RHFData?.push(action.payload);
    },
    setDataAdded: (state, action) => {
      state.wasDataAdded = action.payload;
    },
  },
});

export const { setData, setRHFData, setDataAdded } = formDataSlice.actions;
export default formDataSlice.reducer;
