import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {Films} from '../../mocks/films-mock';
import Genres from './genres';
import {ALL_GENRES} from '../../const/const';

describe('Genres Component tests', () => {
  const films = Films;

  it('Should render correct', () => {

    render(
      <Genres
        films={films}
        activeGenre={Films[0].genre}
        genreClickHandler={jest.fn()}
      />
    );

    expect(screen.getByText(Films[0].genre)).toBeInTheDocument();
    expect(screen.getByText(ALL_GENRES)).toBeInTheDocument(); // в любом случае должен быть пункт "все жанры"
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(6); // всего 6 жанров в нашем тестовом случае
    screen.getAllByRole('listitem')[1].classList.contains('catalog__genres-item--active'); // изначально активным должен быть первый элемент, после all genres
  });

  it('change genre function test, and rerender component', async () => {
    const genreClickHandler = jest.fn();

    const {rerender} = render(
      <Genres
        films={films}
        activeGenre={Films[0].genre}
        genreClickHandler={genreClickHandler}
      />
    );

    screen.getAllByRole('listitem')[1].classList.contains('catalog__genres-item--active'); // изначально активным должен быть первый элемент, после all genres

    expect(genreClickHandler).not.toBeCalled(); // в начале рендера ничего не вызывается

    await userEvent.click(screen.getAllByRole('listitem')[2]); // нажимаем на 3 пункт меню (после всех жанров и 1-го фильма)

    expect(genreClickHandler).toBeCalled(); // проверяем сработку хэндлера
    expect(genreClickHandler).nthCalledWith(1, 'Drama');
    screen.getAllByRole('listitem')[2].classList.contains('catalog__genres-item--active'); // активным стал фильм с жанром "Drama"

    // перерендерим фильм с другим пропсом активного жанра
    rerender(
      <Genres
        films={films}
        activeGenre={Films[3].genre}
        genreClickHandler={genreClickHandler}
      />
    );

    screen.getAllByRole('listitem')[3].classList.contains('catalog__genres-item--active'); // активный жанр сменился при ререндере

  });

});
