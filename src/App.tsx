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
}

class App extends Component<null, IState> {
  state = {
    searchTerm: localStorage.getItem('searchTerm') ? localStorage.getItem('searchTerm') : '',
    searchResults: [],
    prevUrl: localStorage.getItem('prevUrl') ? localStorage.getItem('prevUrl') : null,
    nextUrl: localStorage.getItem('nextUrl') ? localStorage.getItem('nextUrl') : null,
    currentPage: localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1,
  };

  componentDidMount() {
    fetch(
      `https://swapi.dev/api/people?search=${this.state.searchTerm}&page=${this.state.currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          searchResults: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
        });
        localStorage.setItem('prevUrl', data.previous);
        localStorage.setItem('nextUrl', data.next);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  handleSearch() {
    fetch(
      `https://swapi.dev/api/people?search=${this.state.searchTerm}&page=${this.state.currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          searchResults: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,

        });
        localStorage.setItem('prevUrl', data.previous);
        localStorage.setItem('nextUrl', data.next);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  handleInputChange(event) {
    this.setState({ ...this.state, searchTerm: event.target.value });
    localStorage.setItem('currentPage', event.target.value);
  }

  onPageChange(page) {
    fetch(
      `https://swapi.dev/api/people?search=${this.state.searchTerm}&page=${page}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          ...this.state,
          searchResults: data.results,
          currentPage: page,
          prevUrl: data.previous,
          nextUrl: data.next,
        });
        localStorage.setItem('prevUrl', data.previous);
        localStorage.setItem('nextUrl', data.next);
        localStorage.setItem('currentPage', page.toString());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <main className={styles.main}>
        <SearchForm
          searchTerm={this.state.searchTerm}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSearch={this.handleSearch.bind(this)}
        />

        <Items items={this.state.searchResults} />

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
