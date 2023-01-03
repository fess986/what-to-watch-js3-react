import {createAction} from '@reduxjs/toolkit';
// import { Action } from '@reduxjs/toolkit';

export enum ActionTypes {
  CHANGE_GENRE = 'filmList/changeGenre',
  GET_FILMS_BY_GENRE = 'filmList/changeGenre'
}

export const changeGenre = createAction(ActionTypes.CHANGE_GENRE, (genre : string) => ({
  payload : genre
}));

export const getFilmsByGenre = createAction(ActionTypes.GET_FILMS_BY_GENRE);

// export type changeGenreType = typeof changeGenre;
// type getFilmsByGenreType = typeof getFilmsByGenre;

// export type Actions = changeGenreType | getFilmsByGenreType;
