import React, { ChangeEventHandler } from 'react';
import styles from './search-form.module.css';

interface IProps {
  searchTerm: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined;
  handleSearch: () => void;
}

function SearchForm(props: IProps) {
  return (
    <section className={styles.items}>
      <input
        type="text"
        placeholder="Search for items"
        value={props.searchTerm}
        onChange={props.handleInputChange}
      />
      <button onClick={props.handleSearch}>Search</button>
    </section>
  );
}

export default SearchForm;
