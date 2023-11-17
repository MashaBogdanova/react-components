import React, { useContext } from 'react';
import styles from './item-details.module.css';
import closeIcon from '../../assets/icon-close.png';
import { IItem } from '../../types/types';
import { ItemsContext } from '../../App';

interface IProps {
  setItemShown: (isItemShown: boolean) => void;
}

function ItemDetails({ setItemShown }: IProps) {
  const { item }: IItem = useContext(ItemsContext);
  return (
    <article className={styles.itemDetails} data-testid="item-details">
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
        data-testid="details-close-button"
      />
    </article>
  );
}

export default ItemDetails;
