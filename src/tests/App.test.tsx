import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './mockData';
import React from 'react';

beforeEach(cleanup);

describe('App', () => {
  it('renders App component correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={createStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const element = getByTestId('main');

    expect(element).toBeTruthy();
  });
});
