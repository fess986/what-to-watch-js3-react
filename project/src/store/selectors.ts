import { State } from '../types/state';

export const getGenre = (state : State) => state.genre; // appReducer
export const getFilmList = (state : State) => state.filmList; // filmsReducer
export const getActiveFilm = (state : State) => state.activeFIlm; // filmsReducer
export const getfilmsShownCount = (state : State) => state.filmsShownCount; // appReducer
export const getIsActiveFilmLoaded = (state : State) => state.isActiveFilmLoaded; // appReducer
export const getIsFilmsLoaded = (state : State) => state.isFilmsLoaded; // appReducer
export const getAuthStatus = (state : State) => state.autorizationStatus; // в userReducer


