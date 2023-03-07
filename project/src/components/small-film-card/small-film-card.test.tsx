import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Routes, Route } from 'react-router-dom';

import HistoryRouter from '../history-route/history-route';
import {Films} from '../../mocks/films-mock';
import SmallFilmCard from './small-film-card';


const history = createMemoryHistory();

describe('SmallFilmCard Component tests', () => {

  const film = Films[0];

  it('render component tests', () => {
    render(
      <HistoryRouter history={history} >
        <SmallFilmCard film={film}/>
      </HistoryRouter>
    );

    // expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(film.name, 'i'))).toBeInTheDocument(); // тут используем new RegExp для того, чтобы можно было в качестве регулярки использовать переменные значения
    expect(screen.getByRole('link')).toHaveTextContent(film.name); // находим элемент по роли, а в нем текстовый контент
    expect(screen.getByRole('link')).toHaveClass('small-film-card__link'); // находим элемент по роли, а в нем смотрим наличие класса
    screen.getByRole('link').classList.contains('small-film-card__link'); // другой вариант поиска содержания класса
    expect(screen.getByRole('img')).not.toHaveAttribute('disabled');
    expect(screen.getByRole('img')).toBeDefined();
  });

  it('component should redirect to film card', async () => {
    history.push('/component');

    render(
      <HistoryRouter history={history} >
        <Routes>
          <Route
            path = {'/component'}
            element = {<SmallFilmCard film={film}/>}
          />
          <Route
            path = {`/Films/${film.id}`}
            element = {<h1>film component</h1>}
          />

        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText(new RegExp(film.name, 'i'))).toBeInTheDocument(); // убеждаемся, что изначально мы на странице компонента

    await userEvent.click(screen.getByRole('link')); // нажимаем на ссылку

    expect(screen.getByText(/film component/i)).toBeInTheDocument(); // убеждаемся что она сработала, перекинув нас на нужный адрес

  });
});

export {};
