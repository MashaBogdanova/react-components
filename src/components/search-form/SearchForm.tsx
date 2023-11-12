import React, { ChangeEventHandler, useContext } from 'react';
import styles from './search-form.module.css';
import { ItemsContext } from '../../App';

interface IProps {
  handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined;
  handleSearch: () => void;
}

function SearchForm(props: IProps) {
  const { searchTerm } = useContext(ItemsContext);
  return (
    <section className={styles.items} data-testid="search-form">
      <input
        type="text"
        placeholder="Search for items"
        value={searchTerm}
        onChange={props.handleInputChange}
        data-testid="search-input"
      />
      <button onClick={props.handleSearch} data-testid="search-button">
        Search
      </button>
    </section>
  );
}

export default SearchForm;
