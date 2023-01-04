import { State } from '../types/state';

export const getGenre = (state : State) => state.genre;
export const getFilmList = (state : State) => state.filmList;
export const getfilmsShownCount = (state : State) => state.filmsShownCount;
