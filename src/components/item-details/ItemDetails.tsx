import React from 'react';

export interface IItem {
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

function ItemDetails({ item }: IItem) {
  return (
    <article>
      <ul>
        <li>Name: {item.name}</li>
        <li>Year of Birth: {item.birth_year}</li>
        <li>Gender: {item.gender}</li>
        <li>Eye color: {item.eye_color}</li>
        <li>Hair color: {item.hair_color}</li>
      </ul>
    </article>
  );
}

export default ItemDetails;
