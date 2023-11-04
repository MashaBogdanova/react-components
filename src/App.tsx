import React, { ChangeEvent, useEffect, useState } from 'react';
import SearchForm from './components/search-form/SearchForm';
import Pagination from './components/pagination/Pagination';
import Items, { IItem } from './components/Items';
import styles from './App.module.css';

function App() {
  const [searchResults, setSearchResults] = useState<IItem[]>([]);
  const [wasPageLoaded, setPageLoaded] = useState<boolean>(false);
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
    setPageLoaded(false);
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
        setPageLoaded(true);

        localStorage.setItem('searchTerm', searchTerm);
        localStorage.setItem('prevUrl', data.previous);
        localStorage.setItem('nextUrl', data.next);
        localStorage.setItem('currentPage', currentPage.toString());
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
      ) : !wasPageLoaded ? (
        <p>Loading...</p>
      ) : (
        <Items items={searchResults} />
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
