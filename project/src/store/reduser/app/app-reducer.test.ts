import { appReducer, changeGenre, setIsActiveFilmLoaded, resetFilms, addFilms, setIsFilmsLoaded, setError, initialAppState } from './app-reducer';
import { FILMS_COUNT_ON_START, SHOW_MORE_FILMS_COUNT, StoreNames } from '../../../const/const';
import { fetchActiveFilmAction, fetchFilmsAction, clearErrorActionAPI } from '../../api-actions';
import { Films } from '../../../mocks/films-mock';

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
      it('should change only isFilmsLoaded field', () => {
        expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : true}, setIsFilmsLoaded(true))).toEqual({...initialAppState, isActiveFilmLoaded : true, isFilmsLoaded : true});
      });
    });

    describe('setError action tests', () => {
      it('normal action work', () => {
        expect(appReducer.reducer(initialAppState, setError('big errooooor'))).toEqual({...initialAppState, error : 'big errooooor'});
      });
      it('string action', () => {
        expect(appReducer.reducer(initialAppState, {type: `${StoreNames.App}/setError`, payload : 'big errooooor'})).toEqual({...initialAppState, error : 'big errooooor'});
      });
      it('should change only error field', () => {
        expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : true}, setError('big errooooor'))).toEqual({...initialAppState, isActiveFilmLoaded : true, error : 'big errooooor'});
      });
    });

  });

  describe('extra reducers tests', () => {
    describe('fetchActiveFilmAction.pending action tests', () => {
      it('normal action work', () => {
        expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : true}, {type : fetchActiveFilmAction.pending.type})).toEqual({...initialAppState, isActiveFilmLoaded : false});
      });
      it('string action', () => {
        expect(appReducer.reducer(initialAppState, {type: 'films/fetchActiveFilm/pending', payload: Films[0]})).toEqual({...initialAppState, isActiveFilmLoaded : false});
      });
      it('should change only isActiveFilmLoaded field', () => {
        expect(appReducer.reducer({...initialAppState, isFilmsLoaded : true}, {type : fetchActiveFilmAction.pending.type})).toEqual({...initialAppState, isFilmsLoaded : true, isActiveFilmLoaded : false});
      });
    });
  });

  describe('fetchActiveFilmAction.fulfilled action tests', () => {
    it('normal action work', () => {
      expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : false}, {type : fetchActiveFilmAction.fulfilled.type})).toEqual({...initialAppState, isActiveFilmLoaded : true});
    });
    it('string action', () => {
      expect(appReducer.reducer(initialAppState, {type: 'films/fetchActiveFilm/fulfilled', payload: Films[0]})).toEqual({...initialAppState, isActiveFilmLoaded : true});
    });
    it('should change only isActiveFilmLoaded field', () => {
      expect(appReducer.reducer({...initialAppState, isFilmsLoaded : true}, {type : fetchActiveFilmAction.fulfilled.type})).toEqual({...initialAppState, isFilmsLoaded : true, isActiveFilmLoaded : true});
    });
  });

  describe('fetchActiveFilmAction.rejected action tests', () => {
    it('normal action work', () => {
      expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : false}, {type : fetchActiveFilmAction.rejected.type})).toEqual({...initialAppState, error: 'ошибка при загрузке активного фильма'});
    });
    it('string action', () => {
      expect(appReducer.reducer(initialAppState, {type: 'films/fetchActiveFilm/rejected', payload: Films[0]})).toEqual({...initialAppState, error: 'ошибка при загрузке активного фильма'});
    });
    it('should change only error field', () => {
      expect(appReducer.reducer({...initialAppState, isFilmsLoaded : true}, {type : fetchActiveFilmAction.rejected.type})).toEqual({...initialAppState, isFilmsLoaded : true, error: 'ошибка при загрузке активного фильма'});
    });
  });

  describe('fetchFilmsAction.fulfilled action tests', () => {
    it('normal action work', () => {
      expect(appReducer.reducer({...initialAppState, isFilmsLoaded : false}, {type : fetchFilmsAction.fulfilled.type})).toEqual({...initialAppState, isFilmsLoaded : true});
    });
    it('string action', () => {
      expect(appReducer.reducer(initialAppState, {type: 'films/fetchFilms/fulfilled'})).toEqual({...initialAppState, isFilmsLoaded : true});
    });
    it('should change only isFilmsLoaded field', () => {
      expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : true}, {type : fetchFilmsAction.fulfilled.type})).toEqual({...initialAppState, isActiveFilmLoaded : true, isFilmsLoaded : true});
    });
  });

  describe('clearErrorActionAPI.fulfilled action tests', () => {
    it('normal action work', () => {
      expect(appReducer.reducer({...initialAppState, error: 'some error'}, {type : clearErrorActionAPI.fulfilled.type})).toEqual({...initialAppState, error: null});
    });
    it('string action', () => {
      expect(appReducer.reducer({...initialAppState, error: 'some error'}, {type: 'app/clearError/fulfilled'})).toEqual({...initialAppState, error: null});
    });
    it('should change only error field', () => {
      expect(appReducer.reducer({...initialAppState, isActiveFilmLoaded : true}, {type : clearErrorActionAPI.fulfilled.type})).toEqual({...initialAppState, isActiveFilmLoaded : true, error: null});
    });
  });

});

