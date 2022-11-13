import React from 'react';
import { AuthStatus, AppRoute } from '../../const/const';
import {Navigate} from 'react-router-dom';

type PrivateRoute = {
  authStatus: AuthStatus,
  children: JSX.Element,

}

export const PrivateRouteElement = (props : PrivateRoute) : JSX.Element => {
  const {authStatus, children} = props;

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );

};

