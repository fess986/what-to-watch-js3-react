import { StoreNames } from '../../../const/const';
import {InitialFilmsType} from './films-reducer';

type State = {
  [StoreNames.Films] : InitialFilmsType,
}

export const getFilmList = (state : State) => state[StoreNames.Films].filmList;

export const getActiveFilm = (state : State) => state[StoreNames.Films].activeFIlm;
