import React from 'react';
import { Film } from '../../types/mocks-types';
import {ALL_GENRES, GENRES_SHOWN_NUMBER} from '../../const/const';

type GenresProps = {
  films: Film[],
  genre: string,
  genreClickHandler: (filmgenre: string) => void
}

const Genres = ({films, genre, genreClickHandler} : GenresProps) => {

  const fullGenreList = films.map((film) => film.genre);
  let genreList = Array.from(new Set(fullGenreList));
  genreList = genreList.slice(0, GENRES_SHOWN_NUMBER);
  genreList.unshift(ALL_GENRES);

  return (
    <ul className="catalog__genres-list">

      {
        genreList.map((genres) => (
          <li key={Math.random()} className={`catalog__genres-item ${genres === genre ? 'catalog__genres-item--active' : ''}`} onClick={() => genreClickHandler(genres)}>
            <span className="catalog__genres-link">{genres}</span>
          </li>
        ))
      }

    </ul>
  );

};

export default Genres;
