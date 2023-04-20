import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';

import MyListButton from './my-list-button';
import HistoryRouter from '../../../components/history-route/history-route';
import { AppRouteAPI } from '../../../const/const';
import createAPI from '../../../services/api';
import thunk from 'redux-thunk';

// более подробнее создание api store и тд описано в тесте app.test.tsx

const history = createMemoryHistory();

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore(middlewares);
let store = mockStore();

describe('MyListButton Component tests', () => {

  beforeEach(() => { // инициализируется перед каждым запуском
    store = mockStore();
  });


  it(('should render correctly'), () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton status='add'/>
        </HistoryRouter>
      </Provider>

    );

    expect(screen.getByRole('button')).toHaveTextContent('My list');

  });

  it('should dispatch addToFavoriteAction action, when props status="add"', async () => {

    mockAPI // настраиваем поведение фейкового api
      .onGet(`${AppRouteAPI.FavoritePost}1/1`) // на гет-запрос на адрес "/login"
      .reply(400, []); // отвечаем статусом 200 и пустым массивом данных

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton status='add'/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('My list');

    expect(store.getActions()).toEqual([]);

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual(['films/addToFavorities/pending', 'films/addToFavorities/rejected']); // проверяем обращению к экшену addToFavorities при нажатии кнопки
  });

  it('should dispatch removeFromFavoriteAction action, when props status="added"', async () => {

    mockAPI // настраиваем поведение фейкового api
      .onGet(`${AppRouteAPI.FavoritePost}1/0`) // на гет-запрос на адрес "/login"
      .reply(400, []); // отвечаем статусом 200 и пустым массивом данных

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButton status='added'/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('My list');

    expect(store.getActions()).toEqual([]);

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual(['films/removeFromFavorities/pending', 'films/removeFromFavorities/rejected']); // проверяем обращению к экшену removeFromFavorities при нажатии кнопки
  });

});

