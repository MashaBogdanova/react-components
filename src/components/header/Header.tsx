import React  from 'react';
import styles from './header.module.css';


interface IProps {
  searchItems: (value: string) => void
}

class Header extends React.Component<IProps, null> {

  render() {
    return <header>
      <form className={styles.header__form} onSubmit={(e) => {
        this.props.searchItems(e.target[0].value)
      }}>
      <input type="text" />
      <button type="submit">Search</button>
      </form>
    </header>;
  }
}

export default Header;
