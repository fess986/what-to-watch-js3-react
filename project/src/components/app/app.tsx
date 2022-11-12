// импорт рабочих инструментов

import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

// импорт констант
import { AppRoute } from '../../const/const';

// импорт страниц
// стартовые
import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import MovieDetails from '../../pages/movie/movie-page-details/movie-page-details';
import MyList from '../../pages/my-list/my-list';
import SignIn from '../../pages/sign-in/sign-in-default/sign-in-default';
import Player from '../../pages/player/player-play/player';
import Page404 from '../../pages/page404/page404';

// дополнительные
/* import HeadGuest from '../../pages/head-guest/head-guest';
import MovieOverview from '../../pages/movie/movie-overview/movie-overview';
import MovieReviews from '../../pages/movie/movie-reviews/movie-reviews';
import PlayerPause from '../../pages/player/player-pause/player-pause';
import SignInError from '../../pages/sign-in/sign-in-error/sign-in-error';
import SignInMessage from '../../pages/sign-in/sign-in-message/sign-in-message'; */

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />

        <Route
          path={AppRoute.Login}
          element={<SignIn />}
        />

        <Route
          path={AppRoute.MyList}
          element={<MyList />}
        />

        <Route
          path={AppRoute.Film}
          element={<MovieDetails />}
        />

        <Route
          path={AppRoute.AddReview}
          element={<AddReview />}
        />

        <Route
          path={AppRoute.Player}
          element={<Player />}
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
