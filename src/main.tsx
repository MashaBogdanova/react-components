import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './index.css';
import RouterError from './components/router-error/RouterError';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

export const appRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: (
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    ),
    errorElement: <RouterError />,
  },
];

const router = createBrowserRouter(appRoutes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
