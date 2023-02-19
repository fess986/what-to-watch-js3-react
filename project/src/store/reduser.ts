import { createReducer } from '@reduxjs/toolkit';
import {changeGenre, getFilmsByGenre, loadFilms, loadActiveFilm,resetFilms, addFilms, requireAutorization, setIsFilmsLoaded, setIsActiveFilmLoaded, setError} from './action';
import {State} from '../types/state';
import { Film } from '../types/films';
import { AuthStatus } from '../const/const';

import {ALL_GENRES, FILMS_COUNT_ON_START, SHOW_MORE_FILMS_COUNT} from '../const/const';

type initialStateFilmsProps = {
  genre: string, // перенесено в AppState
  filmList: Film[], // перенесено в FilmsState
  activeFIlm: Film | null, // перенесено в FilmsState
  isActiveFilmLoaded: boolean, // перенесено в AppState
  filmsShownCount: number, // перенесено в AppState
  autorizationStatus: AuthStatus, // перенесено в UserState
  isFilmsLoaded: boolean, // перенесено в AppState
  error: string | null,// перенесено в AppState
}

const initialStateFilms : initialStateFilmsProps = {
  genre: ALL_GENRES, // перенесено в AppState
  filmList: [], // перенесено в FilmsState
  activeFIlm: null, // перенесено в FilmsState
  isActiveFilmLoaded: false, // перенесено в AppState
  filmsShownCount: FILMS_COUNT_ON_START, // перенесено в AppState
  autorizationStatus: AuthStatus.UnKnown, // перенесено в UserState
  isFilmsLoaded: false, // перенесено в AppState
  error: null, // перенесено в AppState
};

const reducer = createReducer(initialStateFilms, (builder) => {
  builder
    .addCase(changeGenre, (state : State, action) => { // appReducer
      if (action.payload) {
        state.genre = action.payload;
      }
    })
    .addCase(getFilmsByGenre, (state : State, action) => { // лишний?
      if (action.payload) {
        state.filmList = action.payload;
      }
    })
    .addCase(loadFilms, (state : State, action1) => { // filmsReducer
      state.filmList = action1.payload;
    })
    .addCase(loadActiveFilm, (state : State, action1) => { // filmsReducer
      state.activeFIlm = action1.payload;
    })
    .addCase(resetFilms, (state : State) => { // appReducer
      state.filmsShownCount = FILMS_COUNT_ON_START;
    })
    .addCase(addFilms, (state : State) => { // appReducer
      state.filmsShownCount = state.filmsShownCount + SHOW_MORE_FILMS_COUNT;
    })
    .addCase(requireAutorization, (state : State, action) => { // в userReducer
      state.autorizationStatus = action.payload;
    })
    .addCase(setIsFilmsLoaded, (state : State, action) => { // в appReducer
      state.isFilmsLoaded = action.payload;
    })
    .addCase(setIsActiveFilmLoaded, (state : State, action) => { // в appReducer
      state.isActiveFilmLoaded = action.payload;
    })
    .addCase(setError, (state : State, action) => { // в appReducer
      state.error = action.payload;
    });
});

export {reducer};
