import React, { ChangeEvent, useEffect, useState } from 'react';
import SearchForm from './components/search-form/SearchForm';
import Pagination from './components/pagination/Pagination';
import Items from './components/items/Items';
import styles from './App.module.css';
import ItemDetails, { IItem } from './components/item-details/ItemDetails';
import Preloader from './components/preloader/Preloader';

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

  useEffect(() => {
    fetchItems(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  function fetchItems(searchTerm: string, currentPage: number) {
    setItemsLoaded(false);
    setError(false);

    fetch(
      `https://swapi.dev/api/people?search=${searchTerm}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
        setPrevUrl(data.previous);
        setNextUrl(data.next);
        setCurrentPage(currentPage);
        setItemsLoaded(true);

        localStorage.setItem('searchTerm', searchTerm);
        localStorage.setItem('prevUrl', data.previous);
        localStorage.setItem('nextUrl', data.next);
        localStorage.setItem('currentPage', currentPage.toString());
      })
      .catch(() => {
        setError(true);
      });
  }

  function fetchItem(url) {
    setItemShown(true);
    setItemLoaded(false);
    setError(false);

    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setItemLoaded(true);
      })
      .catch(() => {
        setError(true);
      });
  }

  function handleSearch() {
    fetchItems(searchTerm, 1);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    localStorage.setItem('currentPage', event.target.value);
  }

  function onPageChange(page: number) {
    fetchItems(searchTerm, page);
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
              onItemClick={fetchItem}
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
      <Pagination
        prevUrl={prevUrl}
        nextUrl={nextUrl}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </main>
  );
}

export default App;
