import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Films } from './mocks/films-mock';
import { Reviews } from './mocks/reviews-mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      films = {Films}
      reviews = {Reviews}
    />
  </React.StrictMode>,
);
