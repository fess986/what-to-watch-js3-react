import {configureMockStore} from '@jedmao/redux-mock-store'; // специальная типизированная версия фейкового стора, нужна для эмуляции работы настоящего стора
import { redirect } from './redirect'; // проверяемая MW
import { redirectToRoute } from '../action'; // экшен, который перехватывает при диспатче наша MW
import { State } from '../../types/state';
import { AppRoute } from '../../const/const';
// import browserHistory from '../../browser-history'; не используем, заменяя на фейковую историю

// создаем фейковый объект истории, которым эмулируем настоящий. Имеем одно поле location с путём и метод push для записи в него
const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  }
};

// jest.mock(browserHistory, () => fakeHistory); // так писать нельзя, нужно обращение именно к модулю по его пути

jest.mock('../../browser-history', () => fakeHistory); // ../../browser-history - это сам модуль, получается любое обращение к этому пути из других сущностей, в нашем случае к нему обращается redirect - заменяется на наш вариант объекта

const middleWares = [redirect];
// const MockStore = configureMockStore(middleWares);  // работает и без уточнения типа
const MockStore = configureMockStore<State>(middleWares); // в принципе не обязательно указывать тип стора, так как по факту мы к нему не будем обращаться напрямую
const store = MockStore();

describe('Middleware: redirect', () => {

  beforeEach(() => {
    fakeHistory.push(''); // обнуляем историю перед каждой проверкой
  });

  it('should redirect to correct path', () => {
    store.dispatch(redirectToRoute(AppRoute.Login)); // выполняем выполнение требоемого действия, для проверки, вызовется ли mw redirect , которое перепишет нам фейковую историю

    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should save action in store', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));

    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Login), redirectToRoute(AppRoute.Login)]); // store.getActions() показывает массив всех входящих в него экшенов. Это фишка миенно фкйкового стора, в обычном такого метода нет.
    // expect(store.getState()).toEqual('sonething'); в нем ничего нет, поэтому хранится пустой объект
  });

  it('should not to be redirect because bad action', () => {
    // вызов рандомного экшена не должен никак влиять на историю браузера
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.MyList});

    expect(fakeHistory.location.pathname).not.toBe(AppRoute.MyList);
  });

});
