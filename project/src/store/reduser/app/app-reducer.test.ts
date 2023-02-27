import { appReducer, changeGenre, setIsActiveFilmLoaded, resetFilms, addFilms, setIsFilmsLoaded } from './app-reducer';
import { ALL_GENRES, FILMS_COUNT_ON_START, SHOW_MORE_FILMS_COUNT, StoreNames } from '../../../const/const';

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

    describe('setIsActiveFilmLoaded action tests', () => {
      it('normal action work', () => {
        expect(appReducer.reducer(initialAppState, setIsActiveFilmLoaded(true))).toEqual({...initialAppState, isActiveFilmLoaded: true});
      });
      it('string action', () => {
        expect(appReducer.reducer(initialAppState, {type: `${StoreNames.App}/setIsActiveFilmLoaded`, payload: true})).toEqual({...initialAppState, isActiveFilmLoaded: true });
      });
      it('should change only isActiveFilmLoaded field', () => {
        expect(appReducer.reducer({...initialAppState, isFilmsLoaded : true}, setIsActiveFilmLoaded(true))).toEqual({...initialAppState, isActiveFilmLoaded: true, isFilmsLoaded : true});
      });
    });

    describe('resetFilms action tests', () => {
      it('normal action work', () => {
        expect(appReducer.reducer({...initialAppState, filmsShownCount : 15}, resetFilms())).toEqual({...initialAppState, filmsShownCount: FILMS_COUNT_ON_START});
      });
      it('string action', () => {
        expect(appReducer.reducer({...initialAppState, filmsShownCount : 3}, {type: `${StoreNames.App}/resetFilms`})).toEqual(initialAppState);
      });
      it('should change only filmsShownCount field', () => {
        expect(appReducer.reducer({...initialAppState, isFilmsLoaded : true}, resetFilms())).toEqual({...initialAppState, filmsShownCount: FILMS_COUNT_ON_START, isFilmsLoaded : true});
      });
    });

    describe('addFilms action tests', () => {
      it('normal action work', () => {
        expect(appReducer.reducer({...initialAppState, filmsShownCount : 15}, addFilms())).toEqual({...initialAppState, filmsShownCount: SHOW_MORE_FILMS_COUNT + 15});
      });
      it('string action', () => {
        expect(appReducer.reducer(initialAppState, {type: `${StoreNames.App}/addFilms`})).toEqual({...initialAppState, filmsShownCount: FILMS_COUNT_ON_START + SHOW_MORE_FILMS_COUNT});
      });
      it('should change only filmsShownCount field', () => {
        expect(appReducer.reducer({...initialAppState, isFilmsLoaded : true}, addFilms())).toEqual({...initialAppState, filmsShownCount: FILMS_COUNT_ON_START + SHOW_MORE_FILMS_COUNT, isFilmsLoaded : true});
      });
    });

    describe('setIsFilmsLoaded action tests', () => {
      it('normal action work', () => {
        expect(appReducer.reducer(initialAppState, setIsFilmsLoaded(true))).toEqual({...initialAppState, isFilmsLoaded : true});
      });
      it('string action', () => {
        expect(appReducer.reducer(initialAppState, {type: `${StoreNames.App}/setIsFilmsLoaded`, payload : true})).toEqual({...initialAppState, isFilmsLoaded : true});
      });
      it('should change only filmsShownCount field', () => {
        expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : true}, setIsFilmsLoaded(true))).toEqual({...initialAppState, isActiveFilmLoaded : true, isFilmsLoaded : true});
      });
    });

  });
});
