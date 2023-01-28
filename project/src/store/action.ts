import {createAction} from '@reduxjs/toolkit';
import { Film } from '../types/mocks-types';
import { AuthStatus } from '../const/const';

export enum ActionTypes {
  CHANGE_GENRE = 'films/changeGenre',
  GET_FILMS_BY_GENRE = 'films/getFilmsByGenre',
  LOAD_FILMS = 'films/loadFilms',
  RESET_FILMS = 'films/resetFilms',
  ADD_FILMS = 'films/addFilms',
  REQUIRE_AUTORIZATION = 'user/requireAutorization',
  SET_DATA_LOADED = 'films/isFilmsLoaded'
}

export const changeGenre = createAction(ActionTypes.CHANGE_GENRE, (genre1 : string) => ({
  payload : genre1
}));

// export const requireAutorization = createAction(ActionTypes.REQUIRE_AUTORIZATION, (auth : AuthStatusType) => ({
//   payload : auth
// }));  // так задаем через коллбек-функцию используется например тогда, если нужно создать объект в поле payload (payload: {...})

export const requireAutorization = createAction<AuthStatus>(ActionTypes.REQUIRE_AUTORIZATION); // создадим через дженерик <AuthStatus> - указывает какого типа будет payload

export const setIsDataLoaded = createAction<boolean>(ActionTypes.SET_DATA_LOADED);

export const getFilmsByGenre = createAction(ActionTypes.GET_FILMS_BY_GENRE);

export const loadFilms = createAction<Film[]>(ActionTypes.LOAD_FILMS);

export const resetFilms = createAction(ActionTypes.RESET_FILMS);

export const addFilms = createAction(ActionTypes.ADD_FILMS);

