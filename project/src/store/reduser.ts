import { createReducer } from '@reduxjs/toolkit';
import {changeGenre, getFilmsByGenre, loadFilms, resetFilms} from './action';
import {State} from '../types/state';

import {ALL_GENRES, FILMS_COUNT_ON_START} from '../const/const';

const initialStateFilms = {
  genre: ALL_GENRES,
  filmList: [],
  filmsShownCount: FILMS_COUNT_ON_START,
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
    .addCase(loadFilms, (state, action) => {
      state.filmList = action.payload;
    })
    .addCase(resetFilms, (state) => {
      state.filmsShownCount = FILMS_COUNT_ON_START;
    });
});

export {reducer};
