import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import App from '../App';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RouterError from '../components/router-error/RouterError';

beforeEach(cleanup);

describe('App', () => {
  it('renders App component correctly', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const element = getByTestId('main');

    expect(element).toBeTruthy();
  });

  it('404 page is displayed when navigating to an invalid route', () => {
    const { getByTestId } = render(
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/invalid-route',
            element: <App />,
            errorElement: <RouterError data-testid="404-error" />,
          },
        ])}
      />
    );
    const errorPage = getByTestId('404-error');
    expect(errorPage).toBeTruthy();
  });
});
