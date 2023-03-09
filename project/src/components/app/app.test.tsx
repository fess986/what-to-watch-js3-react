import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

import App from './app';
import HistoryRouter from '../history-route/history-route';
import { AppRoute } from '../../const/const';
import { initialAppState } from '../../store/reduser/app/app-reducer';
import { InitialFilmsState } from '../../store/reduser/films/films-reducer';
import { initialUserState } from '../../store/reduser/user/user-reducer';
import { InitialReviewsState } from '../../store/reduser/reviews/reviews-reducer';
import { StoreNames } from '../../const/const';
import createAPI from '../../services/api';
import thunk from 'redux-thunk';

const api = createAPI(); // инстанс-копия нашего настоящего api, но не она, так как мы создаем заново
// const mockAPI = new MockAdapter(api); // делаем моковую версию api, которая вместо настоящих запросов на сервер, которые нам не нужны, поможет нам формировать собственные ответы сервера на наши запросы. Конкретно тут мы оставим начальную версию api, чтобы не прописывать самим действия сервера
const middlewares = [thunk.withExtraArgument(api)]; // создание чанка с передаваемым ему api как и в нашем настоящем сторе


const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

// передаем состояние стора, так как компонент его использует, иначе будут ошибки
const store = mockStore({
  [StoreNames.App] : initialAppState,
  [StoreNames.User] : initialUserState,
  [StoreNames.Films] : InitialFilmsState,
  [StoreNames.Reviews] : InitialReviewsState,
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Component testing', () => {
  it('main page route testing', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument(); // убеждаемся в том что мы на главной по кнопке "Play"
  });

  it('login page route testing', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument(); // Поиск по тексту лейбла
  });

  it('MyList page route testing', () => {
    history.push(AppRoute.MyList);

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument(); // Поиск по тексту
  });

  it('FilmCard page route testing', () => {
    history.push('/films/1');

    render(fakeApp);

    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Поиск по тексту. При загрузке карточки фильма мы сначала попадаем на страницу загрузки
  });

  it('AddReview page route testing', () => {
    history.push('/films/1/review');

    render(fakeApp);

    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Поиск по тексту. При загрузке страницы добавления комментаря фильма мы сначала попадаем на страницу загрузки
  });

  it('another pathes page route testing', () => {
    history.push('/some_path');

    render(fakeApp);

    expect(screen.getByRole('link')).toBeInTheDocument(); // Попадаем на страницу 404 со ссылкой на главную
  });

});
