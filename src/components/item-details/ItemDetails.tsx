import React from 'react';
import styles from './item-details.module.css';
import closeIcon from '../../assets/icon-close.png';
import {IItem} from "../../types/types";

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
