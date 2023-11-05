import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import './index.css';
import RouterError from './components/router-error/RouterError';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    errorElement: <RouterError />,
    // children: [
    //     {
    //         path: "items/:page/:",
    //         element: <Team />,
    //         loader: teamLoader,
    //     },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
