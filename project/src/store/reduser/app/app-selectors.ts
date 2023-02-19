import { StoreNames } from '../../../const/const';
import { InitialAppType } from './app-reducer';

type State = {
  [StoreNames.App] : InitialAppType,
}

export const getFilmList = (state : State) => state[StoreNames.App].genre;

export const getIsActiveFilmLoaded = (state : State) => state[StoreNames.App].isActiveFilmLoaded;

export const getfilmsShownCount = (state : State) => state[StoreNames.App].filmsShownCount;

export const getIsFilmsLoaded = (state : State) => state[StoreNames.App].isFilmsLoaded;

export const getError = (state : State) => state[StoreNames.App].error;
