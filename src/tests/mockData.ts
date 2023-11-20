import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IItem, ISearchParamsState } from '../types/types';

export interface IInitialState {
  items: {
    itemsData: IItem[];
    currentItemData: IItem | null;
    wasItemsLoaded: boolean;
    wasCurrentItemLoaded: boolean;
    isCurrentItemShown: boolean;
  };
  searchParams: ISearchParamsState;
  error: {
    isError: boolean;
  };
}

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export const createInitialState = (
  wasItemsLoaded = true,
  wasCurrentItemLoaded = true
): IInitialState => {
  return {
    items: {
      itemsData: [
        {
          name: 'Luke Skywalker',
          birth_year: '19 BBY',
          gender: 'Male',
          eye_color: 'Blue',
          hair_color: 'Blond',
          url: 'http://localhost:5173/?page=1&details=1',
        },
      ],
      currentItemData: {
        name: 'Luke Skywalker',
        birth_year: '19 BBY',
        gender: 'Male',
        eye_color: 'Blue',
        hair_color: 'Blond',
        url: 'http://localhost:5173/?page=1&details=1',
      },
      wasCurrentItemLoaded,
      wasItemsLoaded,
      isCurrentItemShown: true,
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
};

const createStore = (wasItemsLoaded = true, wasCurrentItemLoaded = true) =>
  mockStore(createInitialState(wasItemsLoaded, wasCurrentItemLoaded));
export default createStore;
