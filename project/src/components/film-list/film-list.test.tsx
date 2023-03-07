import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';

import {Films} from '../../mocks/films-mock';
import HistoryRouter from '../history-route/history-route';
import FilmList from './film-list';

const history = createMemoryHistory();

describe('SmallFilmCard Component tests', () => {

  const films = Films;

  it('render component tests', () => {
    render(
      <HistoryRouter history={history}>
        <FilmList films={films} filmsShownCount={10}/>
      </HistoryRouter>
    );

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(films[0].name, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(films.length); // количество карточек будет равным длинне массива с переданными фильмами, в случае, когда filmsShownCount больше или равен этого количества

  });

  it('default filmsShownCount case tests', () => {
    render(
      <HistoryRouter history={history}>
        <FilmList films={films}/>
      </HistoryRouter>
    );

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(films[0].name, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(films.length); // количество карточек будет равным длинне массива с переданными фильмами, в случае, когда filmsShownCount больше или равен этого количества

  });

  it('rerender with filmsShownCount less then films length case tests', () => {
    let count = 5;

    const {rerender} = render(
      <HistoryRouter history={history}>
        <FilmList films={films} filmsShownCount={count}/>
      </HistoryRouter>
    );

    expect(screen.getByText(/The Grand Budapest Hotel/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(films[0].name, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).not.toBe(films.length); // количество карточек не должно быть равным длинне массива с переданными фильмами, в случае, когда filmsShownCount меньше или равен этого количества
    expect(screen.getAllByRole('article').length).toBe(count); // количество карточек должно совпадать со значением filmsShownCount

    // Перерендерим компонент с другим значением filmsShownCount и проверим изменилось ли количество отображаемых карточек
    count = 7;

    rerender(
      <HistoryRouter history={history}>
        <FilmList films={films} filmsShownCount={count}/>
      </HistoryRouter>
    );

    expect(screen.getAllByRole('article').length).toBe(count);

  });
});

