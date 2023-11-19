import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchParamsState } from '../../types/types';

const initialState: ISearchParamsState = {
  searchTerm: localStorage.getItem('searchTerm') || '',
  currentPageNumber: localStorage.getItem('currentPage')
    ? Number(localStorage.getItem('currentPage'))
    : 1,
  prevUrl: localStorage.getItem('prevUrl') || null,
  nextUrl: localStorage.getItem('nextUrl') || null,
};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPageNumber = action.payload;
    },
    setPrevUrl(state, action: PayloadAction<string | null>) {
      state.prevUrl = action.payload;
    },
    setNextUrl(state, action: PayloadAction<string | null>) {
      state.nextUrl = action.payload;
    },
  },
});

export const { setSearchTerm, setCurrentPage, setPrevUrl, setNextUrl } =
  searchParamsSlice.actions;

export default searchParamsSlice.reducer;
