import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './search-form.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setSearchTerm } from '../../redux/slices/searchParamsSlice';
import getItems from '../../redux/thunks/getItemsThunk';
import { setCurrentItemShown } from '../../redux/slices/itemsSlice';

function SearchForm() {
  const currentPageNumber = useAppSelector(
    (state) => state.searchParams.currentPageNumber
  );
  const searchTerm = useAppSelector((state) => state.searchParams.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const dispatch = useAppDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
    dispatch(setCurrentItemShown(false));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
    dispatch(getItems(localSearchTerm, currentPageNumber));
  };
  return (
    <section data-testid="search-form">
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for items"
          value={localSearchTerm}
          onChange={handleChange}
          data-testid="search-input"
        />
        <button type="submit" data-testid="search-button">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
