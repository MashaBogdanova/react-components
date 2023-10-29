import React, { ChangeEventHandler } from 'react';
import styles from './header.module.css';

interface IProps {
  searchTerm: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement> | undefined;
  handleSearch: () => void;
}

class Items extends React.Component<IProps, null> {
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

export default Items;
