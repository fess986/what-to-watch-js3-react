import { createReducer } from '@reduxjs/toolkit';
import {changeGenre, getFilmsByGenre, loadFilms, loadActiveFilm,resetFilms, addFilms, requireAutorization, setIsFilmsLoaded, setIsActiveFilmLoaded, error} from './action';
import {State} from '../types/state';
import { Film } from '../types/films';
import { AuthStatus } from '../const/const';

import {ALL_GENRES, FILMS_COUNT_ON_START, SHOW_MORE_FILMS_COUNT} from '../const/const';

type initialStateFilmsProps = {
  genre: string,
  filmList: Film[],
  activeFIlm: Film | null,
  isActiveFilmLoaded: boolean,
  filmsShownCount: number,
  requireAutorization: AuthStatus,
  isFilmsLoaded: boolean,
  error: string | null,
}

const initialStateFilms : initialStateFilmsProps = {
  genre: ALL_GENRES,
  filmList: [],
  activeFIlm: null,
  isActiveFilmLoaded: false,
  filmsShownCount: FILMS_COUNT_ON_START,
  requireAutorization: AuthStatus.UnKnown,
  isFilmsLoaded: false,
  error: null,
};

const reducer = createReducer(initialStateFilms, (builder) => {
  builder
    .addCase(changeGenre, (state : State, action) => {
      if (action.payload) {
        state.genre = action.payload;
      }
    })
    .addCase(getFilmsByGenre, (state : State, action) => {
      if (action.payload) {
        state.filmList = action.payload;
      }
    })
    .addCase(loadFilms, (state : State, action1) => {
      state.filmList = action1.payload;
    })
    .addCase(loadActiveFilm, (state : State, action1) => {
      state.activeFIlm = action1.payload;
    })
    .addCase(resetFilms, (state : State) => {
      state.filmsShownCount = FILMS_COUNT_ON_START;
    })
    .addCase(addFilms, (state : State) => {
      state.filmsShownCount = state.filmsShownCount + SHOW_MORE_FILMS_COUNT;
    })
    .addCase(requireAutorization, (state : State, action) => {
      state.requireAutorization = action.payload;
    })
    .addCase(setIsFilmsLoaded, (state : State, action) => {
      state.isFilmsLoaded = action.payload;
    })
    .addCase(setIsActiveFilmLoaded, (state : State, action) => {
      state.isActiveFilmLoaded = action.payload;
    })
    .addCase(error, (state : State, action) => {
      state.error = action.payload;
    });
});

export {reducer};
