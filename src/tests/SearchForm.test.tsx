import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import SearchForm from '../components/search-form/SearchForm';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './mockData';

beforeEach(cleanup);

describe('SearchForm', () => {
  it('renders SearchForm component correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchForm
            setItemsLoaded={() => {}}
            setCurrentItemShown={() => {}}
          />
        </Provider>
      </BrowserRouter>
    );

    const element = getByTestId('search-form');

    expect(element).toBeTruthy();
  });

  it('saves entered value to local storage on Search button click', async () => {
    localStorage.clear();

    const { queryByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
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
