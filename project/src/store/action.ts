import {createAction} from '@reduxjs/toolkit';
// import { Film } from '../types/films';
import { AppRoute, AppRouteWithId } from '../const/const';

export enum ActionTypes {
  /* CHANGE_GENRE = 'APP/changeGenre', // app-reducer
  GET_FILMS_BY_GENRE = 'APP/getFilmsByGenre', // app-reducer
  RESET_FILMS = 'APP/resetFilms',// app-reducer
  ADD_FILMS = 'APP/addFilms',// app-reducer
  SET_FILMS_LOADED = 'APP/isFilmsLoaded',// app-reducer
  SET_ACTIVE_FILM_LOADED = 'APP/isActiveFilmLoaded', // app-reducer

  LOAD_FILMS = 'FILMS/loadFilms', // films-reducer
  LOAD_ACTIVE_FILM = 'FILMS/loadActiveFilm', // films-reducer

  REQUIRE_AUTORIZATION = 'USER/setAutorizationStatus', //user-reducer */

  REDIRECT_TO_ROUTE = 'game/redirectToRoute', // используем в MW - перехватываем этот тип
}

export const redirectToRoute = createAction<AppRoute | AppRouteWithId>(ActionTypes.REDIRECT_TO_ROUTE); // использукм AppRoute в качестве типа

// !!!!!!!!!!!!!!!!
// данные экшены нам больше не нужны, так как мы перешли на slices, в которых экшены создаются сразу в редьюсеры, и получают имена по названию

/* export const changeGenre = createAction(ActionTypes.CHANGE_GENRE, (genre1 : string) => ({
  payload : genre1
}));

// export const setAutorizationStatus = createAction(ActionTypes.REQUIRE_AUTORIZATION, (auth : AuthStatusType) => ({
//   payload : auth
// }));  // так задаем через коллбек-функцию используется например тогда, если нужно создать объект в поле payload. Можно обойтись и без этого, createAction под капотом сделает тоже самое, так может быть более наглядно (payload: {...})

export const setAutorizationStatus = createAction<AuthStatus>(ActionTypes.REQUIRE_AUTORIZATION); // создадим через дженерик <AuthStatus> - указывает какого типа будет payload

export const setIsFilmsLoaded = createAction<boolean>(ActionTypes.SET_FILMS_LOADED);

export const setIsActiveFilmLoaded = createAction<boolean>(ActionTypes.SET_ACTIVE_FILM_LOADED);

export const getFilmsByGenre = createAction(ActionTypes.GET_FILMS_BY_GENRE);

export const loadFilms = createAction<Film[]>(ActionTypes.LOAD_FILMS);

export const loadActiveFilm = createAction<Film>(ActionTypes.LOAD_ACTIVE_FILM);

export const resetFilms = createAction(ActionTypes.RESET_FILMS);

export const addFilms = createAction(ActionTypes.ADD_FILMS);

export const setError = createAction<string | null>(ActionTypes.ERROR); // если не указать <string | null>, то createAction будет создавать экшен без пэйлоада, те он будет в статусе undefined и поэтому если мы попробуем его где то применить, то TS нас уведомит об этом */


