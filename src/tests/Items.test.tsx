import { assert, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import Items from '../components/items/Items';
import { Provider } from 'react-redux';
import createStore, { createInitialState } from './mockData';

beforeEach(cleanup);
describe('Items', () => {
  it('renders Items component correctly', () => {
    const { getByTestId } = render(
      <Provider store={createStore()}>
        <Items onItemClick={() => {}} />
      </Provider>
    );
    const element = getByTestId('items');
    expect(element).toBeTruthy();
  });

  it('renders the specified number of items', () => {
    const { getByTestId } = render(
      <Provider store={createStore()}>
        <Items onItemClick={() => {}} />
      </Provider>
    );

    const itemsContainer = getByTestId('items');
    const cardElements = itemsContainer.querySelectorAll('li');

    assert(
      cardElements.length === createInitialState().items.itemsData.length,
      `Expected ${
        createInitialState().items.itemsData.length
      } items, but found ${cardElements.length}`
    );
  });
});
