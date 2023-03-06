import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import { Reviews } from './mocks/reviews-mock';
import { store } from './store';
import { Provider } from 'react-redux';
import { checkAuthStatusAction, fetchFilmsAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

// в самом начале запуска приложения проверим статус авторизации
store.dispatch(checkAuthStatusAction());
store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory} >
        {/* <ErrorMessage /> - собственная реализация сообщения об ошибке */}
        <ToastContainer /> {/* отображение ошибки при помощи пакета react-toastify */}
        <App
          reviews = {Reviews}
        />
      </HistoryRouter>

    </Provider>

  </React.StrictMode>,
);
