import { beforeEach, describe, expect, it, assert } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import ItemDetails from '../components/item-details/ItemDetails';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { initialState } from './mockData';

beforeEach(cleanup);

describe('ItemDetails', () => {
  it('renders ItemDetails component correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ItemDetails setItemShown={() => {}} />
      </Provider>
    );
    const element = getByTestId('item-details');
    expect(element).toBeTruthy();
  });

  it('renders relevant item data in ItemDetails component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ItemDetails setItemShown={() => {}} />
      </Provider>
    );

    assert(
      getByText(`Name: ${initialState.items.currentItemData?.name}`),
      'Name detail not found or incorrect'
    );
    assert(
      getByText(
        `Year of Birth: ${initialState.items.currentItemData?.birth_year}`
      ),
      'Year of Birth detail not found or incorrect'
    );
    assert(
      getByText(`Gender: ${initialState.items.currentItemData?.gender}`),
      'Gender detail not found or incorrect'
    );
    assert(
      getByText(`Eye color: ${initialState.items.currentItemData?.eye_color}`),
      'Eye color detail not found or incorrect'
    );
    assert(
      getByText(
        `Hair color: ${initialState.items.currentItemData?.hair_color}`
      ),
      'Hair color detail not found or incorrect'
    );
  });

  it('displays a loading indicator while fetching data', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const preloader = queryByTestId('preloader');
      assert(preloader, 'Loading indicator not found while fetching data');
    });
  });

  it('hides ItemDetails component on close button click', () => {
    const { getByTestId, queryByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const item = document.querySelector('li');
    if (item) {
      fireEvent.click(item);
      fireEvent.click(getByTestId('details-close-button'));
      const itemDetails = queryByTestId('item-details');
      assert(
        !itemDetails,
        'ItemDetails component is still present after close'
      );
    }
  });
});
