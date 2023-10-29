import React, { Component } from 'react';
import SearchForm from './components/header/Items';
import Pagination from './components/pagination/Pagination';
import Items from './components/Items';
import styles from './App.module.css';

interface IState {
  searchTerm: string;
  searchResults: [];
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
  wasPageLoaded: boolean;
}

class App extends Component<null, IState> {
  state = {
    searchTerm: localStorage.getItem('searchTerm')
      ? localStorage.getItem('searchTerm')
      : '',
    searchResults: [],
    prevUrl: localStorage.getItem('prevUrl')
      ? localStorage.getItem('prevUrl')
      : null,
    nextUrl: localStorage.getItem('nextUrl')
      ? localStorage.getItem('nextUrl')
      : null,
    currentPage: localStorage.getItem('currentPage')
      ? Number(localStorage.getItem('currentPage'))
      : 1,
    wasPageLoaded: false,
  };

  fetchItems(searchTerm, currentPage) {
    this.setState({ ...this.state, wasPageLoaded: false });
    fetch(
      `https://swapi.dev/api/people?search=${searchTerm}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          searchResults: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
          currentPage: currentPage,
          wasPageLoaded: true,
        });

        localStorage.setItem('searchTerm', searchTerm);
        localStorage.setItem('prevUrl', data.previous);
        localStorage.setItem('nextUrl', data.next);
        localStorage.setItem('currentPage', currentPage.toString());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  componentDidMount() {
    this.fetchItems(this.state.searchTerm, this.state.currentPage);
  }

  handleSearch() {
    this.fetchItems(this.state.searchTerm, 1);
  }

  handleInputChange(event) {
    this.setState({ ...this.state, searchTerm: event.target.value });
    localStorage.setItem('currentPage', event.target.value);
  }

  onPageChange(page) {
    this.fetchItems(this.state.searchTerm, page);
  }

  render() {
    return (
      <main className={styles.main}>
        <SearchForm
          searchTerm={this.state.searchTerm}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSearch={this.handleSearch.bind(this)}
        />
        {!this.state.wasPageLoaded ? (
          <p>Loading...</p>
        ) : (
          <Items items={this.state.searchResults} />
        )}

        <Pagination
          prevUrl={this.state.prevUrl}
          nextUrl={this.state.nextUrl}
          onPageChange={this.onPageChange.bind(this)}
          currentPage={this.state.currentPage}
        />
      </main>
    );
  }
}

export default App;
