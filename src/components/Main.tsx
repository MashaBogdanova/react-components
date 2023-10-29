import React  from 'react';
import {IItems} from "../App";

class Main extends React.Component<IItems, null> {
  render() {
    return (
      <main>
        {this.props.items.map((item) => (
          <article key={item.name}>{item.name}</article>
        ))}
      </main>
    );
  }
}

export default Main;