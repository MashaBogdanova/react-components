import React from 'react';
import { setError } from '../../redux/slices/errorSlice';
import { useAppDispatch } from '../../hooks/hooks';

function ErrorButton() {
  const dispatch = useAppDispatch();
  return (
    <section>
      <button
        onClick={() => dispatch(setError(true))}
        data-testid="error-button"
      >
        Show Error
      </button>
    </section>
  );
}

export default ErrorButton;
