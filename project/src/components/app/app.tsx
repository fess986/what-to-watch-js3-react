// импорт рабочих инструментов

import React, {useEffect} from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsAction } from '../../store/api-actions';
import { resetFilms } from '../../store/action';
import { getFilmList } from '../../store/selectors';
import { adaptAllFilmAPItoProject } from '../../services/adapterAPI';

// импорт констант
import { AppRoute, AuthStatus } from '../../const/const';

// импорт страниц
// стартовые
import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import FilmCard from '../../pages/film/film';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page404/page404';

import { Film, Review } from '../../types/films';

import { PrivateRouteElement } from '../private-route/private-route';

import SignIn from '../../pages/sign-in/sign-in';


// дополнительные
/* import HeadGuest from '../../pages/head-guest/head-guest';
import MovieOverview from '../../pages/movie/movie-overview/movie-overview';
import MovieReviews from '../../pages/movie/movie-reviews/movie-reviews';
import PlayerPause from '../../pages/player/player-pause/player-pause';

import SignInMessage from '../../pages/sign-in/sign-in-message/sign-in-message'; */

type AppProps = {
  reviews: Review[],
}

function App({reviews} : AppProps): JSX.Element {

  const dispatch = useAppDispatch();

  const filmListAPI = useAppSelector(getFilmList);

  const films: Film[] = adaptAllFilmAPItoProject(filmListAPI) ?? []; // проверка - если не существует выражение adaptAllFilmAPItoProject(filmList), то передаем пустой массив

  console.log(films);

  useEffect(() => {
    // dispatch(fetchFilms());
    // api.get(AppRouteAPI.Films).then((response) => dispatch(loadFilms(response.data))); // грузим первоначальный список фильмов
    dispatch(fetchFilmsAction());

    return () => {
      dispatch(resetFilms());
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main films={films}/>}
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
