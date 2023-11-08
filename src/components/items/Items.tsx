import React from 'react';
import styles from './items.module.css';
import {IItem} from "../../types/types";

interface IProps {
  items: IItem[];
  onItemClick: (url: string) => void;
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
