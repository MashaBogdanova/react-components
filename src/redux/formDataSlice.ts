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
      state.data = action.payload;
    },
    setRHFData: (state, action) => {
      state.RHFData = action.payload;
    },
    setDataAdded: (state, action) => {
      state.wasDataAdded = action.payload;
    },
  },
});

export const { setData, setRHFData, setDataAdded } = formDataSlice.actions;
export default formDataSlice.reducer;
