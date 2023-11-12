import React, { useContext } from 'react';
import styles from './items.module.css';
import { ItemsContext } from '../../App';
import { IItem } from '../../types/types';

interface IProps {
  onItemClick: (url: string) => void;
}

function Items({ onItemClick }: IProps) {
  const { searchResults }: IItem[] = useContext(ItemsContext);
  return (
    <article data-testid="items">
      <ul>
        {searchResults.map((result, index) => (
          <li
            className={styles.item}
            key={index}
            onClick={() => onItemClick(getItemId(searchResults[0].url))}
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
