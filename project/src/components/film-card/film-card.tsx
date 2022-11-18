// компонент одной карточки фильма
import { Film } from '../../types/mocks-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import { useState, MouseEvent } from 'react';

type FilmCardProps = {
  film: Film;
}

function FilmCard(props : FilmCardProps): JSX.Element {
  const {film} = props;
  const {id, name, previewImage} = film;

  const [activeFilm, setActiveFilm] = useState(NaN);

  return (
    <article className="small-film-card catalog__films-card"

      // подсветка красным цветом активного фильма
      style={ id === activeFilm ? {outline: '3px solid red'} : {outline: '3px solid yellow'}}

      onMouseOver = {(e : MouseEvent) => {
        setActiveFilm(id);
      }}

      onMouseOut = {() => {
        setActiveFilm(NaN);
      }}

    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
