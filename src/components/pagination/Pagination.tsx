import React from 'react';
import styles from './pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import getItems from '../../redux/thunks/getItemsThunk';
import { useSearchParams } from 'react-router-dom';
import { setCurrentItemShown } from '../../redux/slices/itemsSlice';

function Pagination() {
  const prevUrl = useAppSelector((state) => state.searchParams.prevUrl);
  const nextUrl = useAppSelector((state) => state.searchParams.nextUrl);
  const searchTerm = useAppSelector((state) => state.searchParams.searchTerm);
  const currentPageNumber = useAppSelector(
    (state) => state.searchParams.currentPageNumber
  );
  const wasItemsLoaded = useAppSelector((state) => state.items.wasItemsLoaded);

  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  function onPageChange(page: number) {
    dispatch(setCurrentItemShown(false));
    dispatch(getItems(searchTerm, page));
    setSearchParams(`page=${page}`);
  }

  return (
    wasItemsLoaded && (
      <article className={styles.pagination} data-testid="pagination">
        <button
          className={styles.button}
          disabled={prevUrl === null}
          onClick={() => onPageChange(currentPageNumber - 1)}
          data-testid="pagination-prev-button"
        >
          &lt;
        </button>
        <p className={styles.currentPage}>{currentPageNumber}</p>
        <button
          className={styles.button}
          disabled={nextUrl === null}
          onClick={() => onPageChange(currentPageNumber + 1)}
          data-testid="pagination-next-button"
        >
          &gt;
        </button>
      </article>
    )
  );
}

export default Pagination;
