import {createAction} from '@reduxjs/toolkit';
import { Film } from '../types/mocks-types';

export enum ActionTypes {
  CHANGE_GENRE = 'filmList/changeGenre',
  GET_FILMS_BY_GENRE = 'filmList/getFilmsByGenre',
  LOAD_FILMS = 'load/loadFilms',
  RESET_FILMS = 'filmList/resetFilms',
  ADD_FILMS = 'filmList/addFilms'
}

export const changeGenre = createAction(ActionTypes.CHANGE_GENRE, (genre1 : string) => ({
  payload : genre1
}));

export const getFilmsByGenre = createAction(ActionTypes.GET_FILMS_BY_GENRE);

export const loadFilms = createAction(ActionTypes.LOAD_FILMS, (films : Film[]) => ({
  payload: films,
}));

export const resetFilms = createAction(ActionTypes.RESET_FILMS);

export const addFilms = createAction(ActionTypes.ADD_FILMS);

