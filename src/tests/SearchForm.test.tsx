import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import SearchForm from '../components/search-form/SearchForm';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './mockData';

beforeEach(cleanup);

describe('SearchForm', () => {
  it('renders SearchForm component correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={createStore()}>
          <SearchForm />
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
        <Provider store={createStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const searchInput = queryByTestId('search-input');
    searchInput &&
      fireEvent.change(searchInput, { target: { value: 'example' } });

    const searchButton = queryByTestId('search-button');
    searchButton && fireEvent.click(searchButton);
    setTimeout(() => {
      expect(localStorage.getItem('searchTerm')).toBe('example');
    }, 100);
  });
});
