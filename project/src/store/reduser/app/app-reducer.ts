import {createSlice} from '@reduxjs/toolkit';
import {fetchActiveFilmAction, fetchFilmsAction, clearErrorActionAPI, fetchSimilarFilms, fetchMyListFilms, addToFavoriteAction, removeFromFavoriteAction } from '../../api-actions';
import {toast} from 'react-toastify';

import {StoreNames, ALL_GENRES, FILMS_COUNT_ON_START, SHOW_MORE_FILMS_COUNT} from '../../../const/const';

export type InitialAppType = {
  genre: string,
  isActiveFilmLoaded: boolean,
  filmsShownCount: number,
  isFilmsLoaded: boolean,
  isSimilarFilmsLoaded: boolean,
  isFavoriteFilmsLoaded: boolean,
  error: string | null,
}

export const initialAppState : InitialAppType = {
  genre: ALL_GENRES,
  isActiveFilmLoaded: false,
  filmsShownCount: FILMS_COUNT_ON_START,
  isFilmsLoaded: false,
  isSimilarFilmsLoaded: false,
  isFavoriteFilmsLoaded: false,
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
  extraReducers(builder) {
    builder
      .addCase(fetchActiveFilmAction.pending, (state) => {
        state.isActiveFilmLoaded = false;
      })
      .addCase(fetchActiveFilmAction.fulfilled, (state) => {
        state.isActiveFilmLoaded = true;
      })
      .addCase(fetchActiveFilmAction.rejected, (state) => {
        state.error = 'ошибка при загрузке активного фильма';
        toast.warn(state.error, {autoClose : 2000, draggable : true});
        // dispatch(redirectToRoute(AppRoute.Main));
      })
      .addCase(fetchFilmsAction.fulfilled, (state) => {
        state.isFilmsLoaded = true;
        // state.isActiveFilmLoaded = true;
      })
      .addCase(clearErrorActionAPI.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isSimilarFilmsLoaded = false;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state) => {
        state.isSimilarFilmsLoaded = true;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        toast.warn('Ошибка загрузки похожих фильмов', {autoClose : 2000, draggable : true});
        state.isSimilarFilmsLoaded = false;
      })
      .addCase(fetchMyListFilms.pending, (state) => {
        state.isFavoriteFilmsLoaded = false;
      })
      .addCase(fetchMyListFilms.fulfilled, (state) => {
        state.isFavoriteFilmsLoaded = true;
      })
      .addCase(fetchMyListFilms.rejected, (state) => {
        toast.warn('Ошибка загрузки любимых фильмов', {autoClose : 2000, draggable : true});
        state.isFavoriteFilmsLoaded = false;
      })
      .addCase(addToFavoriteAction.rejected, (state) => {
        toast.warn('Ошибка добавления фильма в список любимых', {autoClose : 2000, draggable : true});
      })
      .addCase(removeFromFavoriteAction.rejected, (state) => {
        toast.warn('Ошибка удаления фильма из списка любимых', {autoClose : 2000, draggable : true});
      });

    // .addCase(sendReviewAction.rejected, (state, action) => {
    // дубль этого экшена из слайса review
    //   console.log('app', action.error.message);
    //   state.error = 'ошибка при отправке сообщения';
    //   toast.warn(state.error, {autoClose : 2000, draggable : true});
    // })
  },

});

export const { changeGenre, setIsActiveFilmLoaded, resetFilms, addFilms, setIsFilmsLoaded, setError } = appReducer.actions;
