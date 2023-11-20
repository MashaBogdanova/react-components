import { IItem, IResponse } from '../types/types';

export async function fetchItems(
  searchTerm: string,
  currentPage: number
): Promise<IResponse | void> {
  const response = await fetch(
    `https://swapi.dev/api/people?search=${searchTerm}&page=${currentPage}`
  );
  return await response.json();
}

export async function fetchCurrentItem(itemId: string): Promise<IItem | void> {
  const response = await fetch(`https://swapi.dev/api/people/${itemId}`);
  return await response.json();
}
