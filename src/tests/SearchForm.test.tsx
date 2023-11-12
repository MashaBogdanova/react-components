import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import SearchForm from '../components/search-form/SearchForm';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

beforeEach(cleanup);

describe('SearchForm', () => {
  it('renders SearchForm component correctly', () => {
    const { getByTestId } = render(
      <SearchForm handleInputChange={() => {}} handleSearch={() => {}} />
    );

    const element = getByTestId('search-form');

    expect(element).toBeTruthy();
  });

  it('saves entered value to local storage on Search button click', async () => {
    localStorage.clear();

    const { queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const searchInput = queryByTestId('search-input');
    searchInput &&
      fireEvent.change(searchInput, { target: { value: 'example' } });

    const searchButton = queryByTestId('search-button');
    searchButton && fireEvent.click(searchButton);

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('example');
    });
  });
});
