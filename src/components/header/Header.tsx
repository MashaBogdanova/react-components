import React  from 'react';
import styles from './header.module.css';

class Header extends React.Component<null, null> {
  render() {
    return <header className={styles.header}>
      <input/>
      <button>Search</button>
    </header>;
  }
}

export default Header;
