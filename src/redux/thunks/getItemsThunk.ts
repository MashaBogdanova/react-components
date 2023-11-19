import { fetchItems } from '../../api/api';
import { IResponse } from '../../types/types';
import { DispatchType } from '../store';
import { setAllItems } from '../slices/itemsSlice';
import {
  setNextUrl,
  setPrevUrl,
} from '../slices/searchParamsSlice';

const getItems =
  (
    searchTerm: string,
    currentPage: number,
    setItemsLoaded: (isItemLoaded: boolean) => void,
    setSearchParams: (searchTerm: string) => void
  ) =>
  async (dispatch: DispatchType) => {
    setItemsLoaded(false);
    try {
      const response: IResponse | void = await fetchItems(
        searchTerm,
        currentPage
      );
      if (response) {
        dispatch(setAllItems(response.results));
        dispatch(setPrevUrl(response.previous));
        dispatch(setNextUrl(response.next));
      }
      setSearchParams(`page=${currentPage}`);
      setItemsLoaded(true);

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
