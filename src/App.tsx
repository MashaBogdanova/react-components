import React from 'react';
import SearchForm from './components/search-form/SearchForm';
import styles from './App.module.css';
import ErrorButton from './components/error-button/ErrorButton';
import SearchResults from './components/search-results/SearchResults';

function App() {
  return (
    <main className={styles.main} data-testid="main">
      <ErrorButton />
      <SearchForm />
      <SearchResults />
    </main>
  );
}

export default App;
