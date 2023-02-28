import { Action } from '@reduxjs/toolkit';
import createAPI from '../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import { AppRouteAPI } from '../const/const';
import { AuthData } from '../types/user';
import { checkAuthStatusAction, loginAction, logoutAction, fetchFilmsAction, fetchActiveFilmAction } from './api-actions';
import { requireAutorization } from './reduser/user/user-reducer';
import { redirectToRoute } from './action';
import { Films } from '../mocks/films-mock';
// import { requireAutorization } from './reduser/user/user-reducer';
// import { AuthStatus } from '../const/const';

describe('Async actions', () => {
  const api = createAPI(); // инстанс-копия нашего настоящего api, но не она, так как мы создаем заново
  const mockAPI = new MockAdapter(api); // делаем моковую версию api, которая вместо настоящих запросов на сервер, которые нам не нужны, поможет нам формировать собственные ответы сервера на наши запросы
  const middlewares = [thunk.withExtraArgument(api)]; // создание чанка с передаваемым ему api как и в нашем настоящем сторе

  const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares); // создаем фейковую фабрику стора, который копирует наш

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore(); // создаем инстанс стора

    mockAPI // настраиваем поведение фейкового api
      .onGet(AppRouteAPI.LoginCheck) // на гет-запрос на адрес "/login"
      .reply(200, []); // отвечаем статусом 200 и пустым массивом данных

    expect(store.getActions()).toEqual([]); // проверяем, что в начале работы, у нас в сторе не сохранены никакие экшены

    await store.dispatch(checkAuthStatusAction()); // выполняем проверяемый в тесте асинхронный запрос к серверу "авторизованы ли мы?"

    const actions = store.getActions().map(({type}) => type); // так как мы создавали хранилище и экшены через слайсы, в store будут выполняться промис user/checkAuth и в нем происходить диспатч requireAutorization(AuthStatus.Auth) при статусе ответа 200. Так же в экшенах-запросах будет некоторая мета информация, чтобы с нею не париться, мы массив объектов превратим в массив type

    expect(actions).toEqual([
      'user/checkAuth/pending', // начало выполнение асинхронного промиса checkAuthStatusAction
      'USER/requireAutorization', // диспатч в нем requireAutorization(AuthStatus.Auth) при ответе сервера 200
      'user/checkAuth/fulfilled' // завершение промиса с положительным статусом fulfilled
    ]);

  });

  it('should authorization status is «no auth» when server return 400', async () => {
    const store = mockStore();

    mockAPI // настраиваем поведение фейкового api
      .onGet(AppRouteAPI.LoginCheck)
      .reply(400, []); // негативный ответ

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthStatusAction());

    type payload = {
      type: string | unknown,
      payload?: string | unknown,
    }

    const arr = store.getActions() as payload[]; // делаем заглушку, так как TS не уверен, что у полученного массива точно будет свойство payload. И он, кстати, прав. Но нам на это все равно, так что насильно его приводим к собственному типу
    const actions = arr.map((item) => item.payload); // если item.payload не определено, он так же просто будет возращать undefined. Мы это знаем и можем контролировать

    expect(actions).toEqual([
      undefined,
      'NOAUTH', // убеждаемся что в этом случае вызывается аргумент именно NOAUTH
      undefined,
    ]);

  });

  it('loginAction api action should dispath requireAutorization and redirectToRoute, and add token to local storage', async () => {
    const store = mockStore();
    const fakeUser : AuthData = {email: 'test@mail.ru', password: '123'};

    Storage.prototype.setItem = jest.fn();

    mockAPI
      .onPost(AppRouteAPI.LoginPost)
      .reply(200, {token: 'secret'});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      loginAction.pending.type, // 'user/checkAuth/pending'
      requireAutorization.type, // 'USER/requireAutorization'
      redirectToRoute.type, // 'game/redirectToRoute'
      loginAction.fulfilled.type, // 'user/checkAuth/fulfilled'
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1); // проверяем запись в storage. Так как мы используем в качестве заглушки jest.fn() , мы имеем доступ к таким методам, как toBeCalledTimes
    expect(Storage.prototype.setItem).toBeCalledWith('token', 'secret'); // вызывалась с аргументами 'token', 'secret'

  });

  it('logoutAction api action should dispath requireAutorization and clean localStorage', async () => {
    const store = mockStore();

    Storage.prototype.removeItem = jest.fn();

    mockAPI
      .onDelete(AppRouteAPI.Logout)
      .reply(204);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      logoutAction.pending.type, // 'user/checkAuth/pending'
      requireAutorization.type, // 'USER/requireAutorization'
      logoutAction.fulfilled.type, // 'user/checkAuth/fulfilled'
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('token');

  });

  it('fetchFilmsAction api action should dispathed', async () => {
    const store = mockStore();

    mockAPI
      .onGet(AppRouteAPI.Films)
      .reply(200, Films);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type,
    ]);

  });

  it('fetchActiveFilmAction api action should dispathed', async () => {
    const store = mockStore();

    mockAPI
      .onGet(`${AppRouteAPI.Film}1`)
      .reply(200, Films[0]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchActiveFilmAction(1));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      fetchActiveFilmAction.pending.type,
      fetchActiveFilmAction.fulfilled.type,
    ]);

  });

});
