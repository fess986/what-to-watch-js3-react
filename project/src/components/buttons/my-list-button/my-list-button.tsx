import React from 'react';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import {AppRoute} from '../../../const/const';

const MyListButton = () : JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const onButtonClick = () => {
    navigate(AppRoute.MyList);
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={onButtonClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
    </button>
  );
};

export default MyListButton;
