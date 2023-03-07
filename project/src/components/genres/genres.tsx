import React from 'react';
import { Film } from '../../types/films';
import {ALL_GENRES, GENRES_SHOWN_NUMBER} from '../../const/const';

type GenresProps = {
  films: Film[],
  activeGenre: string,
  genreClickHandler: (filmgenre: string) => void
}

const Genres = ({films, activeGenre, genreClickHandler} : GenresProps) => {

  const fullGenreList = films.map((film) => film.genre);
  let genreList = Array.from(new Set(fullGenreList));
  genreList = genreList.slice(0, GENRES_SHOWN_NUMBER);
  genreList.unshift(ALL_GENRES);

  return (
    <ul className="catalog__genres-list">

      {
        genreList.map((genre) => (
          <li key={Math.random()} className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`} onClick={() => genreClickHandler(genre)}>
            <span className="catalog__genres-link">{genre}</span>
          </li>
        ))
      }

    </ul>
  );

};

export default Genres;
