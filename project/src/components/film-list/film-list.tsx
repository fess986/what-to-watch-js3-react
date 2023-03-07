// компонент списка карточек фильмов
import React, {useMemo} from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/films';

type FilmListProps = {
  films: Film[],
  filmsShownCount?: number,
}

// компонент получает массив фильмов и рендерит их
function FilmList({films, filmsShownCount = films.length}: FilmListProps): JSX.Element {

  // const shownList = films.slice(0, filmsShownCount);

  const stableShownList = useMemo(()=> films.slice(0, filmsShownCount), [filmsShownCount, films]); // сохраняем стабильную версию shownList-а

  return (

    <div className="catalog__films-list" >
      {
        stableShownList.map((film : Film) : JSX.Element => (
          <SmallFilmCard film = {film} key = {film.id}/>
        ))
      }

    </div>
  );
}

export default FilmList;
