import { IItem, IResponse } from '../types/types';

export async function fetchItems(
  searchTerm: string,
  currentPage: number,
  setError: (boolean) => void
): Promise<IResponse | void> {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people?search=${searchTerm}&page=${currentPage}`
    );
    return await response.json();
  } catch (error) {
    setError(true);
  }
}

export async function fetchCurrentItem(
  id: string,
  setError: (boolean) => void
): Promise<IItem | void> {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    return await response.json();
  } catch (error) {
    setError(true);
  }
}
