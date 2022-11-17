// компонент одной карточки фильма
import { Film } from '../../types/mocks-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';

type FilmCardProps = {
  films: Film;
}

function FilmCard(props : FilmCardProps): JSX.Element {
  const {films} = props;
  const {name, posterImage} = films;

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
