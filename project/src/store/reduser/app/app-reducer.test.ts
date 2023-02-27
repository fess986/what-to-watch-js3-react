import { appReducer, changeGenre } from './app-reducer';
import { ALL_GENRES, FILMS_COUNT_ON_START, StoreNames } from '../../../const/const';

const initialAppState = {
  genre: ALL_GENRES,
  isActiveFilmLoaded: false,
  filmsShownCount: FILMS_COUNT_ON_START,
  isFilmsLoaded: false,
  error: null,
};

describe('appReducer tests', () => {
  describe('standard reducers tests', () => {
    describe('changeGenre action tests', () => {
      it('normal action work', () => {
        expect(appReducer.reducer(initialAppState, changeGenre('genre'))).toEqual({...initialAppState, genre: 'genre'});
      });
      it('string action', () => {
        expect(appReducer.reducer(initialAppState, {type: `${StoreNames.App}/changeGenre`, payload:'genre'})).toEqual({...initialAppState, genre: 'genre'});
      });
      it('should change only genre field', () => {
        expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : true}, changeGenre('genre'))).toEqual({...initialAppState, genre: 'genre', isActiveFilmLoaded : true});
      });
    });
  });
});
