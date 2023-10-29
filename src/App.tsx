import React from 'react';
import Header from './components/header/Header';
import Main from './components/Main';
import './App.css';
import {render} from "react-dom";

interface IItem {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: [];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IItems {
  items: IItem[];
}

interface IState {
  items: IItem[];
}

class App extends React.Component<null, IState> {
  state = {
    items: [],
  };

  componentDidMount() {
    fetch('https://swapi.dev/api/people?search=&page=1')
      .then((response) => response.json())
      .then((response) => {
        this.setState({ items: response.results });
      });
  }

  async searchItems(term) {
    try {
      let responsePromise = await fetch(
        `https://swapi.dev/api/people?search=Luke&page=1`
      );
      console.log(responsePromise)
      // responsePromise
      //    .then((response) => response.json())
      //    .then((response) => {
      //      debugger
      //      this.setState({ items: response.results });
      //    });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <>
        <Header searchItems={this.searchItems} />
        <Main items={this.state.items} />
      </>
    );
  }
}

export default App;
