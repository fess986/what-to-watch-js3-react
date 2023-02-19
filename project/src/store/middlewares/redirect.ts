import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
// import {reducer} from '../reduser';
import { RootReducerType } from '../reduser/root-reducer';
import { ActionTypes } from '../action';

// type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, RootReducerType> =
  (_store) =>
    (next) =>
      (action) => {

        // api-экшены не вызывают Middleware, поэтому данный код не будет вызываться
        // if (action.type === 'data/fetchFilms') {
        //   console.log(action);
        // }

        // а вот обычные экшены тут проходят, этот код будет вызываттся при смене жанра
        // if (action.type === 'films/changeGenre') {
        //   console.log(action);
        // }

        if (action.type === ActionTypes.REDIRECT_TO_ROUTE) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

