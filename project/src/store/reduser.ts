import { createReducer } from '@reduxjs/toolkit';
import {changeGenre, getFilmsByGenre, loadFilms, resetFilms, addFilms} from './action';
import {State} from '../types/state';
import { Film } from '../types/mocks-types';

import {ALL_GENRES, FILMS_COUNT_ON_START, SHOW_MORE_FILMS_COUNT} from '../const/const';

type initialStateFilmsProps = {
  genre: string,
  filmList: Film[],
  filmsShownCount: number,
}

const initialStateFilms : initialStateFilmsProps = {
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
    .addCase(loadFilms, (state : State, action1) => {
      state.filmList = action1.payload;
    })
    .addCase(resetFilms, (state : State) => {
      state.filmsShownCount = FILMS_COUNT_ON_START;
    })
    .addCase(addFilms, (state : State) => {
      state.filmsShownCount = state.filmsShownCount + SHOW_MORE_FILMS_COUNT;
    });
});

export {reducer};
