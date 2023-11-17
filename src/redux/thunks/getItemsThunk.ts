import { fetchItems } from '../../api/api';

import { IResponse } from '../../types/types';
import { DispatchType } from '../store';
import { setAllItems } from '../slices/itemsSlice';

const getItems =
  (
    searchTerm: string,
    currentPage: number,
    setError: (isError: boolean) => void,
    setItemsLoaded: (isItemLoaded: boolean) => void
  ) =>
  async (dispatch: DispatchType) => {
    try {
      const response: IResponse | void = await fetchItems(
        searchTerm,
        currentPage
      );
      response && dispatch(setAllItems(response.results));
      setItemsLoaded(true);
    } catch (e) {
      setError(true);
    }
  };

export default getItems;
