import React from 'react';

import SmallFilmCard from '../../components/small-film-card/small-film-card';
import { Film } from '../../types/films';

type MoreLikeThisListProps = {
  film: Film[];
}

function MoreLikeThisList(props : MoreLikeThisListProps) : JSX.Element {
  const films = props.film;
  let sliceFilms = [];
  sliceFilms = films.slice(0,4);

  return (
    <>
      {
        sliceFilms.map((film : Film) : JSX.Element => (
          <SmallFilmCard film={film} key={film.id}/>
        ))
      }
    </>
  );
}

export default MoreLikeThisList;
