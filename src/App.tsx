import React, { Component } from 'react';
import Header from './components/header/Header';
import Pagination from './components/Pagination';
import Items from "./components/Items";

interface IState {
  searchTerm: string;
  searchResults: [];
  prevUrl: string | null;
  nextUrl: string | null;
  currentPage: number;
}

class App extends Component<null, IState> {
  state = {
    searchTerm: '',
    searchResults: [],
    prevUrl: null,
    nextUrl: null,
    currentPage: 1,
  };

  componentDidMount() {
    fetch(`https://swapi.dev/api/people?search=&page=${this.state.currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ...this.state,
          searchResults: data.results,
          prevUrl: data.previous,
          nextUrl: data.next,
        });
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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  handleInputChange(event) {
    this.setState({ ...this.state, searchTerm: event.target.value });
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
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <>
        <Header
          searchTerm={this.state.searchTerm}
          handleInputChange={this.handleInputChange.bind(this)}
          handleSearch={this.handleSearch.bind(this)}
        />

        <Items items={this.state.searchResults}/>

        <Pagination
          prevUrl={this.state.prevUrl}
          nextUrl={this.state.nextUrl}
          onPageChange={this.onPageChange.bind(this)}
          currentPage={this.state.currentPage}
        />
      </>
    );
  }
}

export default App;
