import { beforeEach, describe, expect, it, assert } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import Items from '../components/items/Items';
import { ItemsContext } from '../App';

beforeEach(cleanup);
describe('Items', () => {
  it('renders Items component correctly', () => {
    const { getByTestId } = render(<Items onItemClick={() => {}} />);

    const element = getByTestId('items');

    expect(element).toBeTruthy();
  });

  it('renders the specified number of items', () => {
    const mockItems = [
      { name: 'Item 1', url: '/item/1' },
      { name: 'Item 2', url: '/item/2' },
      { name: 'Item 3', url: '/item/3' },
    ];

    const { getByTestId } = render(
      <ItemsContext.Provider
        value={{ searchResults: mockItems, item: {}, searchTerm: '' }}
      >
        <Items onItemClick={() => {}} />
      </ItemsContext.Provider>
    );

    const itemsContainer = getByTestId('items');
    const cardElements = itemsContainer.querySelectorAll('li');

    assert(
      cardElements.length === mockItems.length,
      `Expected ${mockItems.length} items, but found ${cardElements.length}`
    );
  });
});
