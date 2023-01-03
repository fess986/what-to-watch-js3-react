import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Films } from './mocks/films-mock';
import { Reviews } from './mocks/reviews-mock';
import { store } from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        films = {Films}
        reviews = {Reviews}
      />
    </Provider>

  </React.StrictMode>,
);
