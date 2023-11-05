import { IItem } from '../components/item-details/ItemDetails';

interface IResponse {
  count: number;
  next: string;
  previous: string | null;
  result: IItem[];
}

interface IProps {
  searchTerm: string;
  currentPage: number;
  setError: (boolean) => void;
}

export default function fetchItems({
  searchTerm,
  currentPage,
  setError,
}: IProps): Promise<IResponse> {
  fetch(`https://swapi.dev/api/people?search=${searchTerm}&page=${currentPage}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch(() => {
      setError(true);
    });
}
