import React from 'react';
import { useRouteError } from 'react-router-dom';

interface IError {
  statusText?: string;
  message?: string;
}

function RouterError() {
  const error = useRouteError() as IError;
  return (
    <section data-testid="404-error">
      <h1>Oops!</h1>
      <p>Sorry, this page doesn't exist.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  );
}

export default RouterError;
