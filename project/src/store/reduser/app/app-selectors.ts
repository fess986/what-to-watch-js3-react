import { StoreNames } from '../../../const/const';
import { InitialAppType } from './app-reducer';

type State = {
  [StoreNames.App] : InitialAppType,
}

export const getGenre = (state : State) => state[StoreNames.App].genre;

export const getIsActiveFilmLoaded = (state : State) => state[StoreNames.App].isActiveFilmLoaded;

export const getIsPromoFilmLoaded = (state : State) => state[StoreNames.App].isPromoFilmLoaded;

export const getIsFavoriteFilmsLoaded = (state : State) => state[StoreNames.App].isFavoriteFilmsLoaded;

export const getIsSimilarFilmsLoaded = (state : State) => state[StoreNames.App].isSimilarFilmsLoaded;

export const getfilmsShownCount = (state : State) => state[StoreNames.App].filmsShownCount;

export const getIsFilmsLoaded = (state : State) => state[StoreNames.App].isFilmsLoaded;

export const getError = (state : State) => state[StoreNames.App].error;
