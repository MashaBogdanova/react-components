import React from 'react';
import { IItem } from '../item-details/ItemDetails';
import styles from './items.module.css';

interface IProps {
  items: IItem[];
  onItemClick: (url: string) => void;
  // setItemShown: (boolean) => void;
}

function Items({ items, onItemClick }: IProps) {
  return (
    <article>
      <ul>
        {items.map((result, index) => (
          <li
            className={styles.item}
            key={index}
            onClick={() => onItemClick(getItemId(items[0].url))}
          >
            {result.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

function getItemId(url: string) {
  const match = url.match(/\d+/);
  return match && match[0];
}

export default Items;
