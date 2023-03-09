import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
// import {reducer} from '../reduser';
import { RootReducerType } from '../reduser/root-reducer';
import { ActionTypes } from '../action';
import { AppRoute, ActionTypesAPI } from '../../const/const';

// type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, RootReducerType> =
  (_store) =>
    (next) =>
      (action) => {

        // отображение экшенов при отладке
        console.log(action.type);

        // Все обычные экшены тут проходят, этот код будет вызываттся при смене жанра
        // if (action.type === 'APP/changeGenre') {
        //   console.log(action);
        // }

        // api-экшены так же вызывают Middleware, но в отличии от обычных они еще имеют статусы pending, fullfield и rejected. Так же у них есть кроме type и payload - объект-поле meta, который хранит данные статуса выполнения
        // if (action.type === 'data/fetchFilms/fullfield') {
        //   console.log(action);
        // }

        // тут мы перехватываем экшен REDIRECT_TO_ROUTE и пушим историю. Безусловно можно было сделать это и без Middleware
        if (action.type === ActionTypes.REDIRECT_TO_ROUTE) {
          browserHistory.push(action.payload);
        }

        if (action.type === `${ActionTypesAPI.FETCH_ACTIVE_FILM}/rejected`) {
          browserHistory.push(AppRoute.Main);
        }

        return next(action);
      };

