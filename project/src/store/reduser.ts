import { createReducer } from '@reduxjs/toolkit';
import {changeGenre, getFilmsByGenre} from './action';

import {ALL_GENRES} from '../const/const';

const initialStateFilms = {
  genre: ALL_GENRES,
  filmList: [],
};

type State = {
  genre: string,
  filmList: string[],
}

const reduser = createReducer(initialStateFilms, (builder) => {
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
    });
});

export {reduser};
