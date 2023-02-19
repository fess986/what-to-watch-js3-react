import { createSlice } from '@reduxjs/toolkit';

import { StoreNames } from '../../../const/const';
import {Film} from '../../../types/films';

export type InitialFilmsType = {
  filmList: Film[],
  activeFIlm: Film | null,
}

const InitialFilmsState: InitialFilmsType = {
  filmList: [],
  activeFIlm: null,
};

export const filmsReducer = createSlice({
  name: StoreNames.Films,
  initialState: InitialFilmsState,
  reducers: {
    loadFilms : (state, action) => {
      state.filmList = action.payload;
    },
    loadActiveFilm : (state, action) => {
      state.activeFIlm = action.payload;
    }
  },
});

export const { loadFilms, loadActiveFilm } = filmsReducer.actions;
