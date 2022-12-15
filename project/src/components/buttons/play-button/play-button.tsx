import React from 'react';
import {MouseEvent} from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { appRouteWithId } from '../../../const/const';

type PlayButtonProps = {
  id: number|string|undefined;
}

// тут сразу берем id из пропсов
const PlayButton = ({id}: PlayButtonProps) : JSX.Element => {

  const navigate: NavigateFunction = useNavigate();

  const onButtonClick = (event : MouseEvent) => {
    event.preventDefault();
    navigate(appRouteWithId('Player', id));
  };

  return (
    <button className="btn btn--play film-card__button" type="button" onClick={onButtonClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
};

export default PlayButton;
