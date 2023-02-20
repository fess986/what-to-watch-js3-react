import { createSlice } from '@reduxjs/toolkit';

import { StoreNames } from '../../../const/const';
import {Film} from '../../../types/films';
import {adaptAllFilmAPItoProject, adaptFilmAPItoProject} from '../../../services/adapterAPI';
import { fetchFilmsAction, fetchActiveFilmAction } from '../../../store/api-actions';

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
  reducers: { // тут мы добавляем собственные редьюсеры слайса, те, которые мы потом можем экспортировать и использовать в других местах приложения, например диспатчить их или вызывать в других редьюсерах
    loadFilms : (state, action) => { // данный экшен по факту уже не нужен, так как мы загружаем данные, перехватывая api-action под названием fetchFilmsAction и обращаемся к его статусу fulfilled
      state.filmList = action.payload;
    },
    loadActiveFilm : (state, action) => {
      state.activeFIlm = action.payload;
    }
  },
  extraReducers(builder) { // сюда мы можем добавлять сторонние действия, например из других слайсов, из api-actions и обычных стандартных экшенов
    builder
      .addCase(fetchFilmsAction.fulfilled, (state, action) => { // тут может быть и самый обычный экшен, но мы используем api-action под названием fetchFilmsAction и обращаемся к его статусу fulfilled
        state.filmList = adaptAllFilmAPItoProject(action.payload);
      })
      .addCase(fetchActiveFilmAction.fulfilled, (state, action) => { // тут может быть и самый обычный экшен, но мы используем api-action под названием fetchFilmsAction и обращаемся к его статусу fulfilled
        // console.log(action.payload);
        state.activeFIlm = adaptFilmAPItoProject(action.payload);
      });
  },
});

export const { loadFilms, loadActiveFilm } = filmsReducer.actions;
