import { createSlice } from '@reduxjs/toolkit';

interface IFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
}
interface IData {
  age: number;
  agreement: boolean;
  avatar: string;
  email: string;
  gender: 'female' | 'male';
  name: string;
  password: string;
  repeatPassword: string;
}

interface IInitialState {
  data: IData | null;
  RHFData: IData | null;
}

const initialState: IInitialState = {
  data: null,
  RHFData: null,
}

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setRHFData: (state, action) => {
      state.RHFData = action.payload;
    },
  },
});

export const { setData, setRHFData } = formDataSlice.actions;
export default formDataSlice.reducer;
