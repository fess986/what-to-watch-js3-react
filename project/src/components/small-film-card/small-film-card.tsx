// компонент одной карточки фильма
import { Film } from '../../types/films';
import {Link, useNavigate} from 'react-router-dom';
import { useState, MouseEvent } from 'react';

type SmallFilmCardProps = {
  film: Film;
}

function SmallFilmCard(props : SmallFilmCardProps): JSX.Element {
  const {film} = props;
  const {id, name, previewImage} = film;
  console.log(film)
  console.log(id)

  const navigate = useNavigate();
  const [activeFilm, setActiveFilm] = useState(NaN);

  return (
    <article className="small-film-card catalog__films-card"

      // подсветка красным цветом активного фильма
      style={ id === activeFilm ? {outline: '3px solid red'} : {outline: '3px solid yellow'}}

      onMouseOver = {(e : MouseEvent) => {
        setActiveFilm(id);
        console.log(id)
      }}

      onMouseOut = {() => {
        setActiveFilm(NaN);
      }}

      onClick = {() => {
        // параметры (фильмы) передаются из мэйна
        console.log(id)
        navigate(`/Films/${id}`);
      }}

    >
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/Films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
