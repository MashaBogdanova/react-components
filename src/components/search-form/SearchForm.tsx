import React, { ChangeEventHandler } from 'react';
import styles from './search-form.module.css';

interface IProps {
  searchTerm: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined;
  handleSearch: () => void;
}

class SearchForm extends React.Component<IProps, unknown> {
  render() {
    return (
      <section className={styles.items}>
        <input
          type="text"
          placeholder="Search for items"
          value={this.props.searchTerm}
          onChange={this.props.handleInputChange}
        />
        <button onClick={this.props.handleSearch}>Search</button>
      </section>
    );
  }
}

export default SearchForm;
