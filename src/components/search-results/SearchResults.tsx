import React, { useEffect, useState } from 'react';
import styles from '../../App.module.css';
import Preloader from '../preloader/Preloader';
import Items from '../items/Items';
import ItemDetails from '../item-details/ItemDetails';
import Pagination from '../pagination/Pagination';
import getCurrentItem from '../../redux/thunks/getCurrentItemThunk';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getItems from '../../redux/thunks/getItemsThunk';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  wasItemsLoaded: boolean;
  setItemsLoaded: (wasItemLoaded: boolean) => void;
  isCurrentItemShown: boolean;
  setCurrentItemShown: (isItemShown: boolean) => void;
}
function SearchResults({
  wasItemsLoaded,
  setItemsLoaded,
  isCurrentItemShown,
  setCurrentItemShown,
}: IProps) {
  const searchTerm = useAppSelector((state) => state.searchParams.searchTerm);
  const currentPageNumber = useAppSelector(
    (state) => state.searchParams.currentPageNumber
  );
  const [wasCurrentItemLoaded, setCurrentItemLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  async function setCurrentItem(itemId: string): Promise<void> {
    setCurrentItemShown(true);
    setCurrentItemLoaded(false);
    setSearchParams(() => `page=${currentPageNumber}&details=${itemId}`);
    dispatch(getCurrentItem(itemId, setCurrentItemLoaded));
  }

  useEffect(() => {
    dispatch(
      getItems(searchTerm, currentPageNumber, setItemsLoaded, setSearchParams)
    );
    // eslint-disable-next-line
  }, []);

  return (
    <section>
      <div className={styles.results}>
        {!wasItemsLoaded ? (
          <Preloader />
        ) : (
          <Items onItemClick={setCurrentItem} />
        )}

        {wasItemsLoaded &&
          isCurrentItemShown &&
          (!wasCurrentItemLoaded ? (
            <Preloader />
          ) : (
            <ItemDetails setItemShown={setCurrentItemShown} />
          ))}
      </div>
      {wasItemsLoaded && (
        <Pagination
          setItemsLoaded={setItemsLoaded}
          setItemShown={setCurrentItemShown}
        />
      )}
    </section>
  );
}

export default SearchResults;
