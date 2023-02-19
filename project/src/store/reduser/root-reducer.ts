import {combineReducers} from '@reduxjs/toolkit';

import {StoreNames} from '../../const/const';
import {appReducer} from './app/app-reducer';
import {filmsReducer} from './films/films-reducer';
import {userReducer} from './user/user-reducer';

export const rootReducer = combineReducers({
  [StoreNames.App] : appReducer.reducer, // не забываем обращаться к полю reducer
  [StoreNames.User] : userReducer.reducer,
  [StoreNames.Films] : filmsReducer.reducer,
});
