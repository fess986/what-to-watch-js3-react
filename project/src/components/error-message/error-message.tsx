import React from 'react';
import { useAppSelector } from '../../hooks';
import { getError } from '../../store/reduser/app/app-selectors';
import './error-message.css';

const ErrorMessage = () : JSX.Element | null => {

  const error = useAppSelector(getError);

  return (
    (error)
      ? <div className='error-message'>{error}</div>
      : null
  );
};

export default ErrorMessage;
