import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { checkAuthStatusAction, fetchFilmsAction, fetchMyListFilms, fetchPromoFilmAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

// в самом начале запуска приложения проверим статус авторизации
store.dispatch(checkAuthStatusAction());
store.dispatch(fetchFilmsAction());
store.dispatch(fetchMyListFilms());
store.dispatch(fetchPromoFilmAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory} >
        {/* <ErrorMessage /> - собственная реализация сообщения об ошибке */}
        <ToastContainer /> {/* отображение ошибки при помощи пакета react-toastify */}
        <App />
      </HistoryRouter>

    </Provider>

  </React.StrictMode>,
);
