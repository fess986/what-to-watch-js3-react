import React from 'react';
import { Link } from 'react-router-dom';
import {AppRoute} from '../../const/const';

type LogoProps = {
  lightness? : string;
}

function Logo(props? : LogoProps | undefined): JSX.Element {
  let logoStyles = 'logo__link';

  if (props && props.lightness === 'light') {
    logoStyles = 'logo__link logo__link--light';
  }

  return (

    <div className="logo">
      <Link to={AppRoute.Main} className={logoStyles}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>

  );
}

export default Logo;
