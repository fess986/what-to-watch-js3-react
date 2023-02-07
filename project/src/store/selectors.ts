import { State } from '../types/state';

export const getGenre = (state : State) => state.genre;
export const getFilmList = (state : State) => state.filmList;
export const getActiveFilm = (state : State) => state.activeFIlm;
export const getfilmsShownCount = (state : State) => state.filmsShownCount;
export const getIsActiveFilmLoaded = (state : State) => state.isActiveFilmLoaded;
export const getIsFilmsLoaded = (state : State) => state.isFilmsLoaded;
export const getAuthStatus = (state : State) => state.autorizationStatus;


