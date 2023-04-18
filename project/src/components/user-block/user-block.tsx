import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute, AuthStatus } from '../../const/const';
import { getAuthStatus } from '../../store/reduser/user/user-selectors';

const UserBlock = () : JSX.Element => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  const clickHandle = () => {
    dispatch(logoutAction());
  };

  return (
    (authStatus === AuthStatus.Auth)
      ?
      <ul className="user-block">
        <li className="user-block__item">
          <Link to= {AppRoute.MyList}>
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </Link>
        </li>
        <li className="user-block__item">
          <Link to={AppRoute.Main} className="user-block__link" onClick={clickHandle}>Sign out</Link>
        </li>
      </ul>
      :
      <div className='user-block'>
        <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
      </div>
  );};

export default UserBlock;
