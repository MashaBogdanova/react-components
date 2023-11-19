import { fetchCurrentItem } from '../../api/api';
import { DispatchType } from '../store';
import { setCurrentItem } from '../slices/itemsSlice';

const getCurrentItem =
  (itemId: string, setCurrentItemLoaded: (wasItemLoaded: boolean) => void) =>
  async (dispatch: DispatchType) => {
    setCurrentItemLoaded(false);
    try {
      const response = await fetchCurrentItem(itemId);
      response && dispatch(setCurrentItem(response));
      setCurrentItemLoaded(true);
    } catch (e) {
      throw new Error('Generated error');
    }
  };

export default getCurrentItem;
