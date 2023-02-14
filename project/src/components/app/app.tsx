// импорт рабочих инструментов

import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmsAction } from '../../store/api-actions';
import { resetFilms } from '../../store/action';
import { getFilmList, getAuthStatus } from '../../store/selectors';
import { PrivateRouteElement } from '../private-route/private-route';
import HistoryRouter from '../../components/history-route/history-route';
import browserHistory from '../../browser-history';

// импорт констант и типов
import { AppRoute } from '../../const/const';
import { Film, Review } from '../../types/films';

// импорт страниц
// стартовые
import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import FilmCard from '../../pages/film/film';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page404/page404';
import SignIn from '../../pages/sign-in/sign-in';

// дополнительные
// import HeadGuest from '../../pages/head-guest/head-guest';  // кнопка sign-in

type AppProps = {
  reviews: Review[],
}

function App({reviews} : AppProps): JSX.Element {

  const dispatch = useAppDispatch();

  const films : Film[] = useAppSelector(getFilmList);
  const authStatus = useAppSelector(getAuthStatus);

  // const filmListAPI = useAppSelector(getFilmList);
  // const films: Film[] = adaptAllFilmAPItoProject(filmListAPI) ?? []; // проверка - если не существует выражение adaptAllFilmAPItoProject(filmList), то передаем пустой массив

  useEffect(() => {
    // dispatch(fetchFilms());
    // api.get(AppRouteAPI.Films).then((response) => dispatch(loadFilms(response.data))); // грузим первоначальный список фильмов
    dispatch(fetchFilmsAction());

    return () => {
      dispatch(resetFilms());
    };
  }, [dispatch]);

  return (
    // <BrowserRouter></BrowserRouter> - мы использовали до того как нам понадобился кастомный объект истории. Ему не нужно было передавать в параметрах историю
    <HistoryRouter history={browserHistory}>
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
          element={
            <PrivateRouteElement authStatus={authStatus}>
              <MyList />
            </PrivateRouteElement>
          }
        />

        <Route
          path={AppRoute.Film}
          element={<FilmCard reviews={reviews}/>}
        />

        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRouteElement authStatus={authStatus}>
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
    </HistoryRouter>
  );
}

export default App;
