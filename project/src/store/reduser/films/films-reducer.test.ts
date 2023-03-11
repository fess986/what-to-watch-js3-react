import {filmsReducer, loadFilms, loadActiveFilm, InitialFilmsState } from './films-reducer';
import { StoreNames } from '../../../const/const';
import {Films} from '../../../mocks/films-mock';
import {fetchFilmsAction, fetchActiveFilmAction} from '../../api-actions';

describe('Testing of films reducer', () => {

  // тестируем экшен loadFilms, хотя по факту он напрямую и не используется в проекте
  describe('testing of loadFilms action', () => {

    // самая обычная проверка, разве что данные объекта-экшена мы передаем вручную, описывая поля type и payload
    it('testing with action-object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , {type: `${StoreNames.Films}/loadFilms`, payload:[1,2,3]})).toEqual({...InitialFilmsState, filmList: [1,2,3]});
    });

    // в этом тесте мы сознательно меняем одно из полей входящих данных и смотрим чтобы они не поменялись в ходе выполнения проверки
    it('should change only filmList field', () => {
      expect(filmsReducer.reducer({...InitialFilmsState, activeFIlm: Films[0]} , {type: `${StoreNames.Films}/loadFilms`, payload:[1,2,3,4]})).toEqual({...InitialFilmsState, filmList: [1,2,3,4], activeFIlm: Films[0] });
    });

    // тут тестируем передавая экшен-объект loadFilms напрямую из импорта редьюсера
    it('testing with object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , loadFilms([1,2,3]))).toEqual({ ...InitialFilmsState, filmList: [1,2,3] });
    });

    // тут передаем "void 0", что по сути аналог "undefined". Должно отработать нормально, так как по умолчанию в редьюсер и так попадает пустой InitialFilmsState, но в будущем он уже работае с актуальным состоянием объекта-состояния
    it('testing with empty state, should create anyway', () => {
      expect(filmsReducer.reducer(void 0 , loadFilms([1,2,3]))).toEqual({...InitialFilmsState, filmList: [1,2,3] });
    });

    it('testing with empty state, and wrong type. Should return initState state', () => {
      expect(filmsReducer.reducer(void 0 , {type: 'wrong type'})).toEqual(InitialFilmsState);
    });

    it('wrong type, should\'t change state object', () => {
      expect(filmsReducer.reducer({...InitialFilmsState, activeFIlm: Films[0]} , {type: 'wrong type'})).toEqual({...InitialFilmsState, activeFIlm: Films[0]});
    });

    // данный пример будет работать неправильно, даже если отключить проверку тайпскрипта, так как к начальному объектру редьюсер прикрутит еще поле something, а поля activeFIlm наоборот не будет, так как за основу будет браться объект {something : 'something'}, у которого его нет. При этом filmList появится в ходе модификации
    // it('testing with action-object', () => {
    //   expect(filmsReducer.reducer({something : 'something'} , {type: `${StoreNames.Films}/loadFilms`, payload:[1,2,3]})).toEqual({ filmList: [1,2,3], activeFIlm: null });
    // });

    // в данных вариантах activeFIlm будет другим, поэтому проверка не пройдет
    // it('testing with action-object', () => {
    //   expect(filmsReducer.reducer(Object.assign({}, initState, {activeFIlm : 'anyFilm'}) , {type: `${StoreNames.Films}/loadFilms`, payload:[1,2,3]})).toEqual({ filmList: [1,2,3], activeFIlm: null, something : 'something' });
    // });
    // it('testing with action-object', () => {
    //   expect(filmsReducer.reducer({...initState, activeFIlm : '123'} , {type: `${StoreNames.Films}/loadFilms`, payload:[1,2,3]})).toEqual({ filmList: [1,2,3], activeFIlm: null });
    // });

    // в данном варианте будет ошибка, так как редьюсер во время работы все равно создает поле activeFIlm, в ходе своей работы, хотя в самом слайсе этого и не видно. В качестве входных данных можно не указывать начальный стейт, в этом случае он будет равен созданному изначально в редьюсере
    // it('testing with object', () => {
    //   expect(filmsReducer.reducer(undefined , loadFilms([1,2,3]))).toEqual({ filmList: [1,2,3] });
    // });

  });

  // проверка экшена loadActiveFilm
  describe('testing of loadActiveFilm action', () => {

    it('testing with action-object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , {type: `${StoreNames.Films}/loadActiveFilm`, payload: Films[0]})).toEqual({ ...InitialFilmsState, activeFIlm: Films[0] });
    });

    it('should change only activeFIlm field', () => {
      expect(filmsReducer.reducer({...InitialFilmsState, filmList: [Films[0],Films[1]]} , {type: `${StoreNames.Films}/loadActiveFilm`, payload:Films[0]})).toEqual({ ...InitialFilmsState, filmList: [Films[0],Films[1]], activeFIlm: Films[0] });
    });

    it('testing with object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , loadActiveFilm([1,2,3]))).toEqual({ ...InitialFilmsState, activeFIlm: [1,2,3] });
    });

    it('testing with empty state, should create anyway', () => {
      expect(filmsReducer.reducer(void 0 , loadActiveFilm(Films[0]))).toEqual({ ...InitialFilmsState, activeFIlm: Films[0] });
    });

  });

  // проверка экшена fetchFilmsAction.fulfilled
  describe('testing of fetchFilmsAction.fulfilled action', () => {

    // передаем в payload, и должны получить пустой массив
    it('testing with action-object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , {type: 'films/fetchFilms/fulfilled', payload: null})).toEqual(InitialFilmsState);
    });

    // передаем тип экшена через его статус fetchFilmsAction.fulfilled, так как это промис
    it('testing with object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , {type: fetchFilmsAction.fulfilled.type, payload: null})).toEqual(InitialFilmsState);
    });

    it('should change only filmList field', () => {
      expect(filmsReducer.reducer({...InitialFilmsState, activeFIlm: Films[0]} , {type: fetchFilmsAction.fulfilled.type, payload: null})).toEqual({ ...InitialFilmsState, activeFIlm: Films[0] });
    });

  });

  // проверка экшена fetchActiveFilmAction.fulfilled
  describe('testing of fetchActiveFilmAction.fulfilled action', () => {

    // передаем в payload, и должны получить пустой массив
    it('testing with action-object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , {type: 'films/fetchActiveFilm/fulfilled', payload: Films[0]})).toEqual({ ...InitialFilmsState, activeFIlm: Films[0] });
    });

    it('testing with object', () => {
      expect(filmsReducer.reducer(InitialFilmsState , {type: fetchActiveFilmAction.fulfilled.type, payload: Films[0]})).toEqual({ ...InitialFilmsState, activeFIlm: Films[0] });
    });

    it('should change only filmList field', () => {
      expect(filmsReducer.reducer({...InitialFilmsState, filmList: Films} , {type: fetchActiveFilmAction.fulfilled.type, payload: Films[0]})).toEqual({ ...InitialFilmsState, filmList: Films, activeFIlm: Films[0] });
    });

  });
});
