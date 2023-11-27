import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ReactHookForm from "./pages/ReactHookForm";
import UncontrolledForm from "./pages/UncontrolledForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/uncontrolled-form",
        element: <UncontrolledForm />,
    },
    {
        path: "/react-hook-form",
        element: <ReactHookForm />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
