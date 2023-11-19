import { fetchCurrentItem } from '../../api/api';
import { DispatchType } from '../store';
import { setCurrentItem, setCurrentItemLoaded } from '../slices/itemsSlice';

const getCurrentItem = (itemId: string) => async (dispatch: DispatchType) => {
  dispatch(setCurrentItemLoaded(false));
  try {
    const response = await fetchCurrentItem(itemId);
    response && dispatch(setCurrentItem(response));
    setCurrentItemLoaded(true);
  } catch (e) {
    throw new Error('Generated error');
  }
};

export default getCurrentItem;
