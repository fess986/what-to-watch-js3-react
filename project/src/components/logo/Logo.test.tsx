import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';

import Logo from './Logo';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const/const';

describe('testing Logo Component', () => {

  const history = createMemoryHistory();

  it('Should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>,
    );

    const innerText = screen.getAllByText(/W/i);
    const link = screen.getByRole('link');
    const linkCount = screen.queryAllByRole('link'); // поиск количества ссылок. Если ничего не будет найдено, то вернется [] а не сразу выкинется ошибка

    expect(innerText.length).toBe(2); // проверяем отображение логотипа WtW
    expect(link).toBeInTheDocument();
    expect(linkCount.length).not.toBe(0); // количество отлично от 0
  });

  it('Link should redirect at main page', async () => {

    history.push('/somepath'); // перенаправляемся на рандомный путь

    // рендерим компоненты, при этом изначально роутер нас направит на элемент Logo, так как мы прописали для него любой путь(*) кроме AppRoute.Main, а в историю запушили '/somepath'
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<Logo />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument(); // проверяем то, что мы НЕ на главной странице в начале теста
    const innerText = screen.getAllByText(/W/i);
    expect(innerText.length).toBe(2); // убеждаемся, что мы именно на страничке Logo

    await userEvent.click(screen.getByRole('link')); // нажимаем на кнопку, которая должна перенаправлять пользователя на главную страницу

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument(); // перенаправляемся на главную страницк

  });

});
