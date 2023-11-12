import { beforeEach, describe, expect, it, assert } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Pagination from '../components/pagination/Pagination';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

beforeEach(cleanup);

describe('Pagination', () => {
  it('renders Pagination component correctly', () => {
    const { getByTestId } = render(
      <Pagination
        prevUrl="/prev"
        nextUrl="/next"
        currentPage={1}
        onPageChange={() => {}}
      />
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
      <Pagination
        prevUrl={null}
        nextUrl="/next"
        currentPage={1}
        onPageChange={() => {}}
      />
    );

    const prevButton = getByTestId('pagination-prev-button');
    expect(prevButton.disabled).toBeTruthy();
  });

  it('disables next button when nextUrl is null', () => {
    const { getByTestId } = render(
      <Pagination
        prevUrl="/prev"
        nextUrl={null}
        currentPage={1}
        onPageChange={() => {}}
      />
    );

    const nextButton = getByTestId('pagination-next-button');
    expect(nextButton.disabled).toBeTruthy();
  });

  it('updates URL query parameter when page changes', () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const nextButton = queryByTestId('pagination-next-button');
    if (nextButton) {
      fireEvent.click(nextButton);

      const queryParams = new URLSearchParams(window.location.search);
      assert(
        queryParams.get('page') === '2',
        'URL query parameter "page" is not updated after clicking next button'
      );
    }
  });
});
