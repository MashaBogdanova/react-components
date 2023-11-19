import React from 'react';
import styles from './items.module.css';
import { IItem } from '../../types/types';
import { useAppSelector } from '../../hooks/hooks';
import Preloader from '../preloader/Preloader';

interface IProps {
  onItemClick: (url: string) => void;
}

function Items({ onItemClick }: IProps) {
  const wasItemsLoaded = useAppSelector((state) => state.items.wasItemsLoaded);
  const iItems: IItem[] = useAppSelector((state) => state.items.itemsData);
  return !wasItemsLoaded ? (
    <Preloader />
  ) : (
    <article data-testid="items">
      <ul>
        {iItems.map((result) => (
          <li
            className={styles.item}
            key={result.name}
            onClick={() => onItemClick(getItemId(result.url as string))}
          >
            {result.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

function getItemId(url: string): string {
  const match = url.match(/\d+/);
  return match![0];
}

export default Items;
