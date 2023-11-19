import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './mockData';
import React from 'react';

beforeEach(cleanup);

describe('App', () => {
  it('renders App component correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    const element = getByTestId('main');

    expect(element).toBeTruthy();
  });
});
