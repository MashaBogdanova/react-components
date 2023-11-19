import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IItem, ISearchParamsState } from '../types/types';

export interface IInitialState {
  items: {
    itemsData: IItem[];
    currentItemData: IItem | null;
  };
  searchParams: ISearchParamsState;
  error: {
    isError: boolean;
  };
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const initialState: IInitialState = {
  items: {
    itemsData: [
      {
        name: 'Luke Skywalker',
        birth_year: '19 BBY',
        gender: 'Male',
        eye_color: 'Blue',
        hair_color: 'Blond',
      },
    ],
    currentItemData: {
      name: 'Luke Skywalker',
      birth_year: '19 BBY',
      gender: 'Male',
      eye_color: 'Blue',
      hair_color: 'Blond',
    },
  },
  searchParams: {
    searchTerm: '',
    currentPageNumber: 1,
    prevUrl: null,
    nextUrl: null,
  },
  error: {
    isError: false,
  },
};

const store = mockStore(initialState);
export default store;
