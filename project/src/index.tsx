import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Reviews } from './mocks/reviews-mock';
import { store } from './store';
import { Provider } from 'react-redux';
import ErrorMessage from './components/error-message/error-message';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        reviews = {Reviews}
      />
    </Provider>

  </React.StrictMode>,
);
