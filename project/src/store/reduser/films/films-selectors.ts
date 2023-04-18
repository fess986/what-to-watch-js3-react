import { createSelector } from 'reselect';
import { StoreNames } from '../../../const/const';
import {InitialFilmsType} from './films-reducer';
import {getGenre} from '../app/app-selectors';
import { ALL_GENRES } from '../../../const/const';
import { Film } from '../../../types/films';

type State = {
  [StoreNames.Films] : InitialFilmsType,
}

// обычные селекторы
export const getFilmList = (state : State) => state[StoreNames.Films].filmList;
export const getSimilarFilmList = (state : State) => state[StoreNames.Films].similarFilmList;
export const getFavoriteFilmList = (state : State) => state[StoreNames.Films].myFilmList;
export const getActiveFilm = (state : State) => state[StoreNames.Films].activeFIlm;

// // умные селекторы из библиотеки reselect
// // передаем один селектор
// export const test1 = createSelector(getFilmList, (item) => {
//   console.log(item); // в  item попадает массив, получаемый из селектора getFilmList, который мы потом можем преобразовывать
//   return item; // то что вернет селектор
// })

// // можно передавать несколько селекторов в виде массива
// export const test2 = createSelector([getFilmList, getActiveFilm], (item, item2) => {
//   console.log(item);  // массив getFilmList
//   console.log(item2); // массив getActiveFilm
//   return item2;
// })

// // можно передавать в качестве селектора другие createSelector-ы

// export const test3 = createSelector([getFilmList, test2], (item, item2) => {
//   console.log(item);  // массив getFilmList
//   console.log(item2); // массив getActiveFilm, так как в test2 - мы возвращаем именно его
//   return item;
// })

export const getFilteredFilmList = createSelector([getFilmList, getGenre],
  (films, genre) => {
    if (genre === ALL_GENRES) {
      return films;
    }

    return films.filter((film: Film) => film.genre === genre);
  }
);
