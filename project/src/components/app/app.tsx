// импорт рабочих инструментов

import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

// импорт констант
import { AppRoute, AuthStatus } from '../../const/const';

// импорт страниц
// стартовые
import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import FilmCard from '../../pages/film/film';
import MyList from '../../pages/my-list/my-list';
// import SignIn from '../../pages/sign-in/sign-in-default/sign-in-default';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page404/page404';

import { Film, Review } from '../../types/mocks-types';

import { PrivateRouteElement } from '../private-route/private-route';

import SignIn from '../../pages/sign-in/sign-in';


// дополнительные
/* import HeadGuest from '../../pages/head-guest/head-guest';
import MovieOverview from '../../pages/movie/movie-overview/movie-overview';
import MovieReviews from '../../pages/movie/movie-reviews/movie-reviews';
import PlayerPause from '../../pages/player/player-pause/player-pause';

import SignInMessage from '../../pages/sign-in/sign-in-message/sign-in-message'; */

type AppProps = {
  films: Film[],
  reviews: Review[],
}

function App({films, reviews} : AppProps): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main films = {films}/>}
        />

        <Route
          path={AppRoute.Login}
          element={<SignIn />}
        />

        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRouteElement authStatus={AuthStatus.Auth}>
              <MyList films = {films}/>
            </PrivateRouteElement>
          }
        />

        <Route
          path={AppRoute.Film}
          element={<FilmCard films = {films} reviews={reviews}/>}
        />

        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRouteElement authStatus={AuthStatus.Auth}>
              <AddReview />
            </PrivateRouteElement>
          }
        />

        <Route
          path={AppRoute.Player}
          element={<Player films={films}/>}
        />

        <Route
          path='*'
          element={<Page404 />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
