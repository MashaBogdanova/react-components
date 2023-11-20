import { fetchItems } from '../../api/api';
import { IResponse } from '../../types/types';
import { DispatchType } from '../store';
import { setAllItems, setItemsLoaded } from '../slices/itemsSlice';
import {
  setCurrentPage,
  setNextUrl,
  setPrevUrl,
} from '../slices/searchParamsSlice';

const getItems =
  (searchTerm: string, currentPage: number) =>
  async (dispatch: DispatchType) => {
    dispatch(setItemsLoaded(false));
    try {
      const response: IResponse | void = await fetchItems(
        searchTerm,
        currentPage
      );
      if (response) {
        dispatch(setAllItems(response.results));
        dispatch(setPrevUrl(response.previous));
        dispatch(setNextUrl(response.next));
        dispatch(setCurrentPage(currentPage));
      }
      dispatch(setItemsLoaded(true));

      if (response) {
        localStorage.setItem('searchTerm', searchTerm);
        localStorage.setItem('prevUrl', response.previous);
        localStorage.setItem('nextUrl', response.next);
        localStorage.setItem('currentPage', currentPage.toString());
      }
    } catch (e) {
      throw new Error('Generated error');
    }
  };

export default getItems;
