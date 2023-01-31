import { Film } from '../types/films';

// описывать тип для входящих по api данных - так себе развлечение
// eslint-disable-next-line
export const adaptFilmAPItoProject = (film : any) : Film => (
  {
    backgroundColor: film.background_color,
    backgroundImage: film.background_image,
    description: film.description,
    director: film.director,
    genre: film.genre,
    id: film.id,
    isFavorite: film.isFavorite,
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
  }
);

// описывать тип для входящих по api данных - так себе развлечение
// eslint-disable-next-line
export const adaptAllFilmAPItoProject = (films : any[]) => {
  const filmsAPI = films.map((film) => adaptFilmAPItoProject(film));

  return filmsAPI;
};
