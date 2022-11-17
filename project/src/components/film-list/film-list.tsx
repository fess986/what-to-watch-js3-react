// компонент списка карточек фильмов
import React from 'react';
import FilmCard from '../film-card/film-card';
import { Film } from '../../types/mocks-types';

type FilmListProps = {
  films: Film[];
}

// компонент получает массив фильмов и рендерит их
function FilmList(props: FilmListProps): JSX.Element {

  const {films} = props;

  return (

    <div className="catalog__films-list" >

      {
        films.map((film : Film) : JSX.Element => (
          <FilmCard films = {film} key = {film.id}/>
        ))
      }

    </div>
  );
}

export default FilmList;
