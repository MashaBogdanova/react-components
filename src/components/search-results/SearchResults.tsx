import React, { useEffect } from 'react';
import styles from '../../App.module.css';
import Items from '../items/Items';
import ItemDetails from '../item-details/ItemDetails';
import Pagination from '../pagination/Pagination';
import getCurrentItem from '../../redux/thunks/getCurrentItemThunk';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getItems from '../../redux/thunks/getItemsThunk';
import { useSearchParams } from 'react-router-dom';
import { setCurrentItemShown } from '../../redux/slices/itemsSlice';

function SearchResults() {
  const searchTerm = useAppSelector((state) => state.searchParams.searchTerm);
  const currentPageNumber = useAppSelector(
    (state) => state.searchParams.currentPageNumber
  );
  const isCurrentItemShown = useAppSelector(
    (state) => state.items.isCurrentItemShown
  );
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  async function setCurrentItem(itemId: string): Promise<void> {
    dispatch(setCurrentItemShown(true));
    dispatch(getCurrentItem(itemId));
    setSearchParams(() => `page=${currentPageNumber}&details=${itemId}`);
  }

  useEffect(() => {
    dispatch(getItems(searchTerm, currentPageNumber));
    setSearchParams(() => `page=${currentPageNumber}`);
    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <div className={styles.results}>
        <Items onItemClick={setCurrentItem} />
        {isCurrentItemShown && <ItemDetails />}
      </div>
      <Pagination />
    </section>
  );
}

export default SearchResults;
