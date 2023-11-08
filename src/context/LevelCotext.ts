import { createContext } from 'react';
import { fetchCurrentItem, fetchItems } from '../api/api';

export default async function setContext() {
  const items = await fetchItems();
  const currentItem = await fetchCurrentItem();
  return createContext({ items, currentItem });
}
