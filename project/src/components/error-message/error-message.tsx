import React from 'react';
import { useAppSelector } from '../../hooks';
import './error-message.css';

const ErrorMessage = () : JSX.Element | null => {

  const {error} = useAppSelector((state) => state);

  return (
    (error)
      ? <div className='error-message'>{error}</div>
      : null
  );
};

export default ErrorMessage;
