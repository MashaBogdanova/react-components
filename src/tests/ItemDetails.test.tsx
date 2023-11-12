import { beforeEach, describe, expect, it, assert } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import ItemDetails from '../components/item-details/ItemDetails';
import App, { ItemsContext } from '../App';
import { IItem } from '../types/types';
import { BrowserRouter } from 'react-router-dom';

beforeEach(cleanup);

describe('ItemDetails', () => {
  it('renders ItemDetails component correctly', () => {
    const { getByTestId } = render(<ItemDetails setItemShown={() => {}} />);

    const element = getByTestId('item-details');

    expect(element).toBeTruthy();
  });

  it('renders relevant item data in ItemDetails component', () => {
    const mockItem: IItem = {
      name: 'Luke Skywalker',
      birth_year: '19 BBY',
      gender: 'Male',
      eye_color: 'Blue',
      hair_color: 'Blond',
    };

    const { getByText } = render(
      <ItemsContext.Provider
        value={{ item: mockItem, searchTerm: '', searchResults: [] }}
      >
        <ItemDetails setItemShown={() => {}} />
      </ItemsContext.Provider>
    );

    assert(
      getByText(`Name: ${mockItem.name}`),
      'Name detail not found or incorrect'
    );
    assert(
      getByText(`Year of Birth: ${mockItem.birth_year}`),
      'Year of Birth detail not found or incorrect'
    );
    assert(
      getByText(`Gender: ${mockItem.gender}`),
      'Gender detail not found or incorrect'
    );
    assert(
      getByText(`Eye color: ${mockItem.eye_color}`),
      'Eye color detail not found or incorrect'
    );
    assert(
      getByText(`Hair color: ${mockItem.hair_color}`),
      'Hair color detail not found or incorrect'
    );
  });

  it('displays a loading indicator while fetching data', async () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <App />
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
        <App />
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
