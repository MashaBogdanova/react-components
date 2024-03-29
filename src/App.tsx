import React, { ChangeEvent, Component } from 'react';
import SearchForm from './components/search-form/SearchForm';
import Pagination from './components/pagination/Pagination';
import Items, { IItems } from './components/Items';
import styles from './App.module.css';

interface IState {
  searchTerm: string;
  searchResults: IItems[];
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
  wasPageLoaded: boolean;
  isError: boolean;
}

class App extends Component<unknown, IState> {
  state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    searchResults: [],
    prevUrl: localStorage.getItem('prevUrl') || null,
    nextUrl: localStorage.getItem('nextUrl') || null,
    currentPage: localStorage.getItem('currentPage')
      ? Number(localStorage.getItem('currentPage'))
      : 1,
    wasPageLoaded: false,
    isError: false,
  };

  fetchItems(searchTerm: string, currentPage: number) {
    this.setState({ ...this.state, wasPageLoaded: false, isError: false });
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
      .catch(() => {
        this.setState({ ...this.state, isError: true });
      });
  }

  componentDidMount() {
    this.fetchItems(this.state.searchTerm, this.state.currentPage);
  }

  handleSearch() {
    this.fetchItems(this.state.searchTerm, 1);
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, searchTerm: event.target.value });
    localStorage.setItem('currentPage', event.target.value);
  }

  onPageChange(page: number) {
    this.fetchItems(this.state.searchTerm, page);
  }

  render() {
    if (this.state.isError) {
      throw new Error('Generated error');
    }
    return (
      <main className={styles.main}>
        <button
          onClick={() =>
            this.setState({
              ...this.state,
              isError: true,
            })
          }
        >
          Show Error
        </button>
        <SearchForm
          searchTerm={this.state.searchTerm}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSearch={this.handleSearch.bind(this)}
        />

        {this.state.isError ? (
          <p>Oops... Something went wrong. Reload the page.</p>
        ) : !this.state.wasPageLoaded ? (
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
