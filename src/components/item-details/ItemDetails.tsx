import React from 'react';
import styles from './item-details.module.css';
import closeIcon from '../../assets/icon-close.png';

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

interface IProps {
  item: IItem;
  setItemShown: (boolean) => void;
}

function ItemDetails({ item, setItemShown }: IProps) {
  return (
    <article className={styles.itemDetails}>
      <ul>
        <li>Name: {item.name}</li>
        <li>Year of Birth: {item.birth_year}</li>
        <li>Gender: {item.gender}</li>
        <li>Eye color: {item.eye_color}</li>
        <li>Hair color: {item.hair_color}</li>
      </ul>
      <img
        className={styles.closeIcon}
        onClick={() => setItemShown(false)}
        src={closeIcon}
        alt="close"
      />
    </article>
  );
}

export default ItemDetails;
