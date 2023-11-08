import React, { ChangeEvent, useEffect, useState } from 'react';
import SearchForm from './components/search-form/SearchForm';
import Pagination from './components/pagination/Pagination';
import Items from './components/items/Items';
import styles from './App.module.css';
import ItemDetails, { IItem } from './components/item-details/ItemDetails';
import Preloader from './components/preloader/Preloader';
import { useSearchParams } from 'react-router-dom';
import { fetchCurrentItem, fetchItems, IResponse } from './api/api';

function App() {
  const [searchResults, setSearchResults] = useState<IItem[]>([]);
  const [item, setItem] = useState<IItem>(null);
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
  const [currentPage, setCurrentPage] = useState<number>(
    localStorage.getItem('currentPage')
      ? Number(localStorage.getItem('currentPage'))
      : 1
  );
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setItems(searchTerm, currentPage);
    // eslint-disable-next-line
  }, [searchTerm, currentPage]);

  async function setItems(
    searchTerm: string,
    currentPage: number
  ): Promise<void> {
    setItemsLoaded(false);
    setError(false);
    setSearchParams(`page=${currentPage}`);

    const data: IResponse | void = await fetchItems(
      searchTerm,
      currentPage,
      setError
    );

    if (data) {
      setSearchResults(data.results);
      setPrevUrl(data.previous);
      setNextUrl(data.next);
      setCurrentPage(currentPage);
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
    setSearchParams(() => `page=${currentPage}&details=${id}`);

    const data = await fetchCurrentItem(id, setItem);
    if (data) {
      setItem(data);
      setItemLoaded(true);
    }
  }

  function handleSearch() {
    setItems(searchTerm, 1);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    localStorage.setItem('currentPage', event.target.value);
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
    <main className={styles.main}>
      <button onClick={() => setError(true)}>Show Error</button>
      <SearchForm
        searchTerm={searchTerm}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />

      {isError ? (
        <p>Oops... Something went wrong. Reload the page.</p>
      ) : (
        <section className={styles.results}>
          {!wasItemsLoaded ? (
            <Preloader />
          ) : (
            <Items
              items={searchResults}
              onItemClick={setCurrentItem}
              setItemShown={setItemShown}
            />
          )}

          {wasItemsLoaded &&
            isItemShown &&
            (!wasItemLoaded ? (
              <Preloader />
            ) : (
              <ItemDetails item={item} setItemShown={setItemShown} />
            ))}
        </section>
      )}
      {wasItemsLoaded && (
        <Pagination
          prevUrl={prevUrl}
          nextUrl={nextUrl}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      )}
    </main>
  );
}

export default App;
