import React from 'react';
import { PropsWithChildren } from 'react';
import { AuthStatus, AppRoute } from '../../const/const';
import {Navigate} from 'react-router-dom';

type PrivateRoute = PropsWithChildren <{
  authStatus: AuthStatus,
  children: JSX.Element,
}>

const PrivateRouteElement = (props : PrivateRoute) : JSX.Element => {
  const {authStatus, children} = props;

  return (
    authStatus === AuthStatus.Auth || authStatus === AuthStatus.UnKnown
      ? children
      : <Navigate to={AppRoute.Login} />
  );

};

export default PrivateRouteElement;
