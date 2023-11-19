import React from 'react';
import styles from './pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCurrentPage } from '../../redux/slices/searchParamsSlice';
import getItems from '../../redux/thunks/getItemsThunk';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  setItemsLoaded: (wasItemsLoaded: boolean) => void;
  setItemShown: (wasItemShown: boolean) => void;
}

function Pagination({ setItemsLoaded, setItemShown }: IProps) {
  const prevUrl = useAppSelector((state) => state.searchParams.prevUrl);
  const nextUrl = useAppSelector((state) => state.searchParams.nextUrl);
  const searchTerm = useAppSelector((state) => state.searchParams.searchTerm);
  const currentPageNumber = useAppSelector(
    (state) => state.searchParams.currentPageNumber
  );
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  function onPageChange(page: number) {
    setItemShown(false);
    setSearchParams(() => `page=${page}`);
    dispatch(getItems(searchTerm, page, setItemsLoaded, setSearchParams));
    dispatch(setCurrentPage(page));
  }

  return (
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
  );
}

export default Pagination;
