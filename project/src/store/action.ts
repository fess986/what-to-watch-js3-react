import {createAction} from '@reduxjs/toolkit';
import { Film } from '../types/films';
import { AuthStatus, AppRoute } from '../const/const';

export enum ActionTypes {
  CHANGE_GENRE = 'films/changeGenre',
  GET_FILMS_BY_GENRE = 'films/getFilmsByGenre',
  LOAD_FILMS = 'films/loadFilms',
  LOAD_ACTIVE_FILM = 'films/loadActiveFilm',
  RESET_FILMS = 'films/resetFilms',
  ADD_FILMS = 'films/addFilms',
  REQUIRE_AUTORIZATION = 'user/requireAutorization',
  SET_FILMS_LOADED = 'films/isFilmsLoaded',
  SET_ACTIVE_FILM_LOADED = 'films/isActiveFilmLoaded',
  CHECK_AUTH_STATUS = 'user/checkAuthStatus',
  LOGIN = 'user/login',
  LOGOUT = 'user/logout',
  ERROR = 'app/error',
  REDIRECT_TO_ROUTE = 'game/redirectToRoute',
}

export const changeGenre = createAction(ActionTypes.CHANGE_GENRE, (genre1 : string) => ({
  payload : genre1
}));

// export const requireAutorization = createAction(ActionTypes.REQUIRE_AUTORIZATION, (auth : AuthStatusType) => ({
//   payload : auth
// }));  // так задаем через коллбек-функцию используется например тогда, если нужно создать объект в поле payload. Можно обойтись и без этого, createAction под капотом сделает тоже самое, так может быть более наглядно (payload: {...})

export const requireAutorization = createAction<AuthStatus>(ActionTypes.REQUIRE_AUTORIZATION); // создадим через дженерик <AuthStatus> - указывает какого типа будет payload

export const setIsFilmsLoaded = createAction<boolean>(ActionTypes.SET_FILMS_LOADED);

export const setIsActiveFilmLoaded = createAction<boolean>(ActionTypes.SET_ACTIVE_FILM_LOADED);

export const getFilmsByGenre = createAction(ActionTypes.GET_FILMS_BY_GENRE);

export const loadFilms = createAction<Film[]>(ActionTypes.LOAD_FILMS);

export const loadActiveFilm = createAction<Film>(ActionTypes.LOAD_ACTIVE_FILM);

export const resetFilms = createAction(ActionTypes.RESET_FILMS);

export const addFilms = createAction(ActionTypes.ADD_FILMS);

export const setError = createAction<string | null>(ActionTypes.ERROR); // если не указать <string | null>, то createAction будет создавать экшен без пэйлоада, те он будет в статусе undefined и поэтому если мы попробуем его где то применить, то TS нас уведомит об этом

export const redirectToRoute = createAction<AppRoute>(ActionTypes.REDIRECT_TO_ROUTE); // использукм AppRoute в качестве типа

