// компонент навигации на странице FilmCard
import React from 'react';
import { useState, MouseEvent } from 'react';
import {Link, useParams} from 'react-router-dom';

import {FILM_MENU} from '../../const/const';

function FilmNavigation(): JSX.Element {
  const params = useParams();

  let initialState : string = FILM_MENU.details;

  switch (params['*']) {
    case FILM_MENU.details.toLowerCase() :
      initialState = FILM_MENU.details;
      break;
    case FILM_MENU.overview.toLowerCase() :
      initialState = FILM_MENU.overview;
      break;
    case FILM_MENU.reviews.toLowerCase() :
      initialState = FILM_MENU.reviews;
      break;
  }

  const [activeItem, setActiveItem] = useState(initialState);

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
