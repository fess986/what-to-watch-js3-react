// компонент навигации на странице FilmCard
import React from 'react';
import { useState, MouseEvent } from 'react';
import {Link} from 'react-router-dom';

import {FILM_MENU} from '../../const/const';

function FilmNavigation(): JSX.Element {
  const [activeItem, setActiveItem] = useState(FILM_MENU.details);

  return (
    <ul className="film-nav__list">
      <li className={`film-nav__item ${ activeItem === FILM_MENU.overview ? 'film-nav__item--active' : ''}`}>
        <Link to={FILM_MENU.overview.toLowerCase()} className='film-nav__link' onClick={(e : MouseEvent) => {
          setActiveItem(FILM_MENU.overview);
        }}
        >{FILM_MENU.overview}
        </Link>
      </li>
      <li className={`film-nav__item ${ activeItem === FILM_MENU.details ? 'film-nav__item--active' : ''}`}>
        <Link to={FILM_MENU.details.toLowerCase()} className="film-nav__link" onClick={(e : MouseEvent) => {
          setActiveItem(FILM_MENU.details);
        }}
        >Details
        </Link>
      </li>
      <li className={`film-nav__item ${ activeItem === FILM_MENU.reviews ? 'film-nav__item--active' : ''}`}>
        <Link to={FILM_MENU.reviews.toLowerCase()} className="film-nav__link" onClick={(e : MouseEvent) => {
          setActiveItem(FILM_MENU.reviews);
        }}
        >{FILM_MENU.reviews}
        </Link>
      </li>
    </ul>
  );
}

export default FilmNavigation;
