// компонент одной карточки фильма
import { Film } from '../../types/films';
import {Link, useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import SmallVideoPlayer from '../../components/small-film-card-player/small-film-card-player';

type SmallFilmCardProps = {
  film: Film;
}

function SmallFilmCard(props : SmallFilmCardProps): JSX.Element {
  const {film} = props;
  const {id, name, previewImage} = film;

  const navigate = useNavigate();
  // const [activeFilm, setActiveFilm] = useState(NaN);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={() => setIsPlaying(true)}
      onMouseLeave={() => setIsPlaying(false)}

      // подсветка красным цветом активного фильма. Пока не будем использовать
      // style={ id === activeFilm ? {outline: '3px solid red'} : {outline: '3px solid yellow'}}

      // onMouseOver = {(e : MouseEvent) => {
      //   setActiveFilm(id);
      // }}

      // onMouseOut = {() => {
      //   setActiveFilm(NaN);
      // }}

      onClick = {() => {
        navigate(`/Films/${id}`);
      }}

    >
      <div className="small-film-card__image">

        {isPlaying
          ?
          <SmallVideoPlayer film={film} key={film.id} src={film.previewVideoLink} isPlaying={isPlaying}/>
          :
          <img src={previewImage} alt={name} width="280" height="175" />}

      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/Films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default React.memo(SmallFilmCard); //мемоизируем элемент. При этом предварительно оборачиваем в предке передаваемые пропсы useMemo для хранении стабильной ссылки на передаваемый объект
