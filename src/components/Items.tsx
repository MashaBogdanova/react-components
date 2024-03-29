import React from 'react';

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

class Items extends React.Component<IItems, unknown> {
  render() {
    return (
      <section>
        <ul>
          {this.props.items.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Items;
