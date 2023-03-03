import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

import SignIn from './sign-in';
import HistoryRouter from '../../components/history-route/history-route';

describe('testing SignIn Component', () => {

  const history = createMemoryHistory(); // соковый объект истории

  // вариант с такой историей тут не пройдет, так как нет обращения к этому модулю из вложенных модулей
  // const fakeHistory = {
  //   location: {pathname: ''},
  //   push(path: string) {
  //     this.location.pathname = path;
  //   }
  // };
  // jest.mock('../../browser-history', () => fakeHistory);

  const mockStore = configureMockStore(); // моковый стор
  const store = mockStore({}); // указываем пустой объект в качестве параметра, для того, чтобы сохранить параметры по умолчанию объекта состояния. Конкретно тут, сработает и без этого, видимо работает перегрузка данных

  it('Should render correctly', async () => {

    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>,
      </Provider>
    );

    // убеждаемся, что рендер прошел успешно
    const numberOfSignInText = screen.getAllByText(/Sign in/i);
    expect(numberOfSignInText.length).toBe(2);
    expect(screen.getByRole('button')).toBeInTheDocument(); // одна кнопка
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument(); // Поиск по тексту лейбла
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument(); // Поиск по тексту лейбла
    expect(screen.getByText(/Email address/i)).toBeInTheDocument(); // Текст из скрытого лейбла можно найти и обычным способом
    expect(screen.getByPlaceholderText(/E-mail address/i)).toBeInTheDocument(); // плейсхолдеры ищутся таким образом
    expect(screen.getByTestId('login')).toBeInTheDocument(); // поиск по специальному, добавленному нами аттрибуту, для того чтобы найти элемент наверняка

    await userEvent.type(screen.getByTestId('login'), 'hello!!'); // эмулируем ввод текста hello!! в инпут логина
    await userEvent.type(screen.getByTestId('password'), '123321');// эмулируем ввод текста 123321 в инпут пароля

    expect(screen.getByDisplayValue(/hello!!/i)).toBeInTheDocument(); // проверка, ввелось ли в поле инпута-логина текст, который мы эмулировали ранее
    expect(screen.getByDisplayValue(/123321/i)).toBeInTheDocument(); // проверка, ввелось ли в поле инпута-пароля текст, который мы эмулировали ранее

  });

});
