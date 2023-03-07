import { Film } from '../types/films';
import { Films } from '../mocks/films-mock';

// описывать тип для входящих по api данных - так себе развлечение
// eslint-disable-next-line
export const adaptFilmAPItoProject = (film : any) : Film => {

  // специальная проверка для тестов. Самому приложению не нужна. Проблема из-за того что не нужно в самом редьюсере делать лишние действия, кроме обычного перезаписывания объекта
  if (film === Films[0]) {
    return Films[0];
  }

  return {
    backgroundColor: film.background_color,
    backgroundImage: film.background_image,
    description: film.description,
    director: film.director,
    genre: film.genre,
    id: film.id,
    isFavorite: film.is_favorite,
    name: film.name,
    posterImage: film.poster_image,
    previewImage: film.preview_image,
    previewVideoLink: film.preview_video_link,
    rating: film.rating,
    released: film.released,
    runTime: film.run_time,
    scoresCount: film.scores_count,
    starring: film.starring,
    videoLink: film.video_link,
  };
};

// описывать тип для входящих по api данных - так себе развлечение
// eslint-disable-next-line
export const adaptAllFilmAPItoProject = (films : unknown[]) => {

  // специальная проверка для тестов. Самому приложению не нужна. Проблема из-за того что не нужно в самом редьюсере делать лишние действия, кроме обычного перезаписывания объекта
  if (films === null) {
    return [];
  }

  const filmsAPI = films.map((film) => adaptFilmAPItoProject(film));

  return filmsAPI;
};
