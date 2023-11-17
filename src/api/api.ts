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

export async function fetchCurrentItem(
  id: string,
  setError: (isError: boolean) => void
): Promise<IItem | void> {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    return await response.json();
  } catch (error) {
    setError(true);
  }
}
