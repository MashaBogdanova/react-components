import React, { useState } from 'react';
import SearchForm from './components/search-form/SearchForm';
import styles from './App.module.css';
import ErrorButton from './components/error-button/ErrorButton';
import SearchResults from './components/search-results/SearchResults';

function App() {
  const [wasItemsLoaded, setItemsLoaded] = useState<boolean>(false);
  const [isCurrentItemShown, setCurrentItemShown] = useState<boolean>(false);

  return (
    <main className={styles.main} data-testid="main">
      <ErrorButton />
      <SearchForm
        setItemsLoaded={setItemsLoaded}
        setCurrentItemShown={setCurrentItemShown}
      />
      <SearchResults
        wasItemsLoaded={wasItemsLoaded}
        setItemsLoaded={setItemsLoaded}
        isCurrentItemShown={isCurrentItemShown}
        setCurrentItemShown={setCurrentItemShown}
      />
    </main>
  );
}

export default App;
