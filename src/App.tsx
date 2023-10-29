import React from 'react';
import Header from './components/header/Header';
import Main from './components/Main';
import './App.css';

export interface IItems {
    items: string[]
}

class App extends React.Component<null, IItems> {
  state = {
    items: ['1', '2'],
  };

  render() {
    return (
      <>
        <Header />
        <Main items={this.state.items}/>
      </>
    );
  }
}

export default App;
