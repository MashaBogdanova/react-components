import React from 'react';
import { IItem } from '../item-details/ItemDetails';

interface IProps {
  items: IItem[];
  onItemClick: (url: string) => void;
}

function Items({ items, onItemClick }: IProps) {
  return (
    <article>
      <ul>
        {items.map((result, index) => (
          <li key={index} onClick={() => onItemClick(result.url)}>
            {result.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Items;
