import {createSlice} from '@reduxjs/toolkit';

import {StoreNames, ALL_GENRES, FILMS_COUNT_ON_START, SHOW_MORE_FILMS_COUNT} from '../../../const/const';

export type InitialAppType = {
  genre: string,
  isActiveFilmLoaded: boolean,
  filmsShownCount: number,
  isFilmsLoaded: boolean,
  error: string | null,
}

const initialAppState : InitialAppType = {
  genre: ALL_GENRES,
  isActiveFilmLoaded: false,
  filmsShownCount: FILMS_COUNT_ON_START,
  isFilmsLoaded: false,
  error: null,
};

export const appReducer = createSlice({
  name: StoreNames.App,
  initialState: initialAppState,
  reducers: {
    changeGenre : (state, action) => {
      if (action.payload) {
        state.genre = action.payload;
      }
    },
    setIsActiveFilmLoaded : (state, action) => {
      state.isActiveFilmLoaded = action.payload;
    },
    resetFilms : (state) => {
      state.filmsShownCount = FILMS_COUNT_ON_START;
    },
    addFilms : (state) => {
      state.filmsShownCount = state.filmsShownCount + SHOW_MORE_FILMS_COUNT;
    },
    setIsFilmsLoaded : (state, action) => {
      state.isFilmsLoaded = action.payload;
    },
    setError : (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { changeGenre, setIsActiveFilmLoaded, resetFilms, addFilms, setIsFilmsLoaded, setError } = appReducer.actions;
