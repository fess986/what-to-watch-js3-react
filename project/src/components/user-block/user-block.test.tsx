import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';

import HistoryRouter from '../history-route/history-route';
import { AuthStatus, AppRoute, StoreNames } from '../../const/const';
import UserBlock from './user-block';

const initStateUnknown = {
  [StoreNames.User] : {autorizationStatus : AuthStatus.UnKnown},
};

const initStateNoAuth = {
  [StoreNames.User] : {autorizationStatus : AuthStatus.NoAuth},
};

const initStateAuth = {
  [StoreNames.User] : {autorizationStatus : AuthStatus.Auth},
};

const history = createMemoryHistory();
const mockStore = configureMockStore([thunk]);

describe('UserBlock Component tests', () => {

  beforeEach(() => {
    history.push('/user');
  });


  it('render component AuthStatus = UnKnown', async () => {
    // передадим в стор версию с неизвестным статусом, симулируем роутинг для проверки работы ссылки-перехода на страницу регистрации
    const store = mockStore(initStateUnknown);

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Routes>
            <Route
              path='/user'
              element={<UserBlock />}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>login</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toHaveTextContent('Sign in');

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('login')).toBeInTheDocument();

  });

  it('render component AuthStatus = NoAuth', async () => {
    const store = mockStore(initStateNoAuth);

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Routes>
            <Route
              path='/user'
              element={<UserBlock />}
            />
            <Route
              path={AppRoute.Login}
              element={<h1>login</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toHaveTextContent('Sign in');

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('login')).toBeInTheDocument();

  });

  it('render component AuthStatus = Auth. Check "Sign Out" ref', async () => {
    const store = mockStore(initStateAuth);

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Routes>
            <Route
              path='/user'
              element={<UserBlock />}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>main page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(store.getActions()).toStrictEqual([]);

    await userEvent.click(screen.getByText('Sign out')); // при нажатии ссылки должен произойти переход на главную страницу приложения и выполниться действия лог-аута

    expect(screen.getByText('main page')).toBeInTheDocument();


    const actions = store.getActions().map((item) => item.type); // превращаем массив объектов с экшенами в массив их типов

    expect(actions).toStrictEqual(['user/logout/pending', 'user/logout/rejected']);
  });

  it('render component AuthStatus = Auth. Check avatar click', async () => {
    const store = mockStore(initStateAuth);

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <Routes>
            <Route
              path='/user'
              element={<UserBlock />}
            />
            <Route
              path={AppRoute.MyList}
              element={<h1>myList page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument(); // проверяем наличие изображения аватарки

    // expect(store.getActions()).toStrictEqual([]);

    await userEvent.click(screen.getByRole('img')); // при нажатии ссылки должен произойти переход на страницу myList приложения

    expect(screen.getByText('myList page')).toBeInTheDocument();

  });

});
