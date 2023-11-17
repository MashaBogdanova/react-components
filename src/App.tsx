import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from './components/search-form/SearchForm';
import Items from './components/items/Items';
import ItemDetails from './components/item-details/ItemDetails';
import Pagination from './components/pagination/Pagination';
import Preloader from './components/preloader/Preloader';
import { fetchCurrentItem, fetchItems } from './api/api';
import { IItem, IResponse } from './types/types';
import styles from './App.module.css';
import getItems from './redux/thunks/getItemsThunk';
import { useAppDispatch } from './hooks/hooks';

export const ItemsContext = createContext({
  searchResults: [],
  item: {},
  searchTerm: '',
});

function App() {
  const dispatch = useAppDispatch();

  const [searchResults, setSearchResults] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem | null>(null);
  const [isItemShown, setItemShown] = useState<boolean>(false);
  const [wasItemsLoaded, setItemsLoaded] = useState<boolean>(false);
  const [wasItemLoaded, setItemLoaded] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );
  const [prevUrl, setPrevUrl] = useState<string | null>(
    localStorage.getItem('prevUrl') || null
  );
  const [nextUrl, setNextUrl] = useState<string | null>(
    localStorage.getItem('nextUrl') || null
  );
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(
    localStorage.getItem('currentPage')
      ? Number(localStorage.getItem('currentPage'))
      : 1
  );
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getItems(searchTerm, currentPageNumber, setError, setItemsLoaded));
    // eslint-disable-next-line
  }, []);

  async function setItems(
    searchTerm: string,
    currentPage: number
  ): Promise<void> {
    setItemsLoaded(false);
    setError(false);
    setSearchParams(`page=${currentPage}`);

    const data: IResponse | void = await fetchItems(searchTerm, currentPage);

    if (data) {
      setSearchResults(data.results);
      setPrevUrl(data.previous);
      setNextUrl(data.next);
      setCurrentPageNumber(currentPage);
      setItemsLoaded(true);

      localStorage.setItem('searchTerm', searchTerm);
      localStorage.setItem('prevUrl', data.previous);
      localStorage.setItem('nextUrl', data.next);
      localStorage.setItem('currentPage', currentPage.toString());
    }
  }

  async function setCurrentItem(id: string): Promise<void> {
    setItemShown(true);
    setItemLoaded(false);
    setError(false);
    setSearchParams(() => `page=${currentPageNumber}&details=${id}`);

    const data = await fetchCurrentItem(id, setItem);
    if (data) {
      setItem(data);
      setItemLoaded(true);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    setItemShown(false);
    localStorage.setItem('searchTerm', event.target.value);
  }

  function onPageChange(page: number) {
    setItems(searchTerm, page);
    setSearchParams(() => `page=${page}`);
    setItemShown(false);
  }

  if (isError) {
    throw new Error('Generated error');
  }

  return (
    <ItemsContext.Provider value={{ searchResults, item, searchTerm }}>
      <main className={styles.main} data-testid="main">
        <button onClick={() => setError(true)} data-testid="error-button">
          Show Error
        </button>
        <SearchForm
          handleInputChange={handleInputChange}
          handleSearch={() => setItems(searchTerm, 1)}
        />

        {isError ? (
          <p>Oops... Something went wrong. Reload the page.</p>
        ) : (
          <section className={styles.results}>
            {!wasItemsLoaded ? (
              <Preloader />
            ) : (
              <Items onItemClick={setCurrentItem} setItemShown={setItemShown} />
            )}

            {wasItemsLoaded &&
              isItemShown &&
              (!wasItemLoaded ? (
                <Preloader />
              ) : (
                <ItemDetails setItemShown={setItemShown} />
              ))}
          </section>
        )}
        {wasItemsLoaded && (
          <Pagination
            prevUrl={prevUrl}
            nextUrl={nextUrl}
            onPageChange={onPageChange}
            currentPage={currentPageNumber}
          />
        )}
      </main>
    </ItemsContext.Provider>
  );
}

export default App;
