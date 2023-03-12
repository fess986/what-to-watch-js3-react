// импорт рабочих инструментов

import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/reduser/user/user-selectors';
import PrivateRouteElement from '../private-route/private-route';

// импорт констант и типов
import { AppRoute } from '../../const/const';

// импорт страниц
// стартовые
import Main from '../../pages/main/main';
import AddReview from '../../pages/add-review/add-review';
import FilmCard from '../../pages/film/film';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import Page404 from '../../pages/page404/page404';
import SignIn from '../../pages/sign-in/sign-in';

function App(): JSX.Element {

  // const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthStatus);

  // dispatch(fetchFilmsAction());

  // const filmListAPI = useAppSelector(getFilmList);
  // const films: Film[] = adaptAllFilmAPItoProject(filmListAPI) ?? []; // проверка - если не существует выражение adaptAllFilmAPItoProject(filmList), то передаем пустой массив

  // useEffect(() => {
  //   // dispatch(fetchFilms());
  //   // api.get(AppRouteAPI.Films).then((response) => dispatch(loadFilms(response.data))); // грузим первоначальный список фильмов
  //   dispatch(fetchFilmsAction());

  //   return () => {
  //     dispatch(resetFilms());
  //   };
  // }, [dispatch]);

  return (
    // <BrowserRouter></BrowserRouter> - мы использовали до того как нам понадобился кастомный объект истории. Ему не нужно было передавать в параметрах историю
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
        element={<FilmCard />}
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
        element={<Player />}
      />

      <Route
        path='*'
        element={<Page404 />}
      />

    </Routes>
  );
}

export default App;
