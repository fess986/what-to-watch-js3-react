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

  describe('General reducer behavior tests', () => {
    test('testing with empty state, and wrong type. Should return initState state', () => {
      expect(appReducer.reducer(void 0 , {type: 'wrong type'})).toEqual(initialAppState);
    });

    it('wrong type, should\'t change state object', () => {
      expect(appReducer.reducer({...initialAppState, isFilmsLoaded: true} , {type: 'wrong type'})).toEqual({...initialAppState, isFilmsLoaded: true});
    });
  });

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
