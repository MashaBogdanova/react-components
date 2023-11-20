import { assert, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { Provider } from 'react-redux';
import createStore from './mockData';
import React from 'react';
import Pagination from '../components/pagination/Pagination';

beforeEach(cleanup);

describe('Pagination', () => {
  it('renders Pagination component correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={createStore()}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );

    const element = getByTestId('pagination');
    const prevButton = getByTestId('pagination-prev-button');
    const nextButton = getByTestId('pagination-next-button');

    expect(element).toBeTruthy();
    expect(prevButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });

  it('disables prev button when prevUrl is null', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={createStore()}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );

    const prevButton = getByTestId(
      'pagination-prev-button'
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBeTruthy();
  });

  it('disables next button when nextUrl is null', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={createStore()}>
          <Pagination />
        </Provider>
      </BrowserRouter>
    );

    const nextButton = getByTestId(
      'pagination-next-button'
    ) as HTMLButtonElement;
    expect(nextButton.disabled).toBeTruthy();
  });

  it('updates URL query parameter when page changes', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Provider store={createStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const nextButton = queryByTestId('pagination-next-button');
    if (nextButton) {
      fireEvent.click(nextButton);

      const queryParams = new URLSearchParams(window.location.search);

      setTimeout(() => {
        assert(
          queryParams.get('page') === '2',
          'URL query parameter "page" is not updated after clicking next button'
        );
      }, 100);
    }
  });
});
