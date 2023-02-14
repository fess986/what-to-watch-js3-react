import { AxiosInstance } from 'axios';

import {saveToken, removeToken} from '../services/token';
import { adaptAllFilmAPItoProject, adaptFilmAPItoProject } from '../services/adapterAPI';
import { store } from '.';
import {loadFilms, setIsFilmsLoaded, requireAutorization, loadActiveFilm, setIsActiveFilmLoaded, setError, redirectToRoute} from './action';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { ThunkActionResult } from '../types/state';
import {AuthData, UserData} from '../types/user';
import { AppRouteAPI, AuthStatus, ERROR_TIMEOUT, AppRoute} from '../const/const';

// вариант без создания createAsyncThunk
export const fetchFilms = () : ThunkActionResult<void> =>
  async (dispatch, _getState , api): Promise<void> => { // возвращаемое значение должно совпадать с дженериком типа ThunkActionResult, в сл
    api.get(AppRouteAPI.Films).then((response) => dispatch(loadFilms(response.data)));
  };

type createAsyncThunkProps = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchFilmsAction = createAsyncThunk<void, undefined, { // void - в данном случае тип возврата из функции, undefined - тип передаваемого аргумента _arg
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFilms',
    async (_arg, {dispatch, extra: api}) => { // в качестве _arg - передаваемые параметры
      const {data} = await api.get(AppRouteAPI.Films);
      dispatch(loadFilms(adaptAllFilmAPItoProject(data)));
      dispatch(setIsFilmsLoaded(true));
    },
  );

export const fetchActiveFilmAction = createAsyncThunk<void, number, createAsyncThunkProps>(
  'data/fetchActiveFilm',
  async (id, {dispatch, extra: api}) => { // в качестве _arg - передаваемые параметры
    const {data} = await api.get(`${AppRouteAPI.Film}${id}`);
    dispatch(loadActiveFilm(adaptFilmAPItoProject(data)));
    dispatch(setIsActiveFilmLoaded(true));
  },
);

export const checkAuthStatusAction = createAsyncThunk<void, undefined, createAsyncThunkProps>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(AppRouteAPI.LoginCheck);
      dispatch(requireAutorization(AuthStatus.Auth));

    } catch {
      dispatch(requireAutorization(AuthStatus.NoAuth));
    }
  },
);

// export const loginAction = createAsyncThunk<void, AuthData, createAsyncThunkProps // AuthData - тип передаваемых данных, в данном случае {login, password}
//   >(
//     'user/login',
//     async ({email, password}, {dispatch, extra: api}) => {
//       const {data: {token}} = await api.post<UserData>(AppRouteAPI.LoginPost, {email, password});
//       saveToken(token);
//       dispatch(requireAutorization(AuthStatus.Auth));
//     },
//   );

export const loginAction = createAsyncThunk<void, AuthData, createAsyncThunkProps // AuthData - тип передаваемых данных, в данном случае {login, password}
>(
  'user/login',
  async (requestData, {dispatch, extra: api}) => {
    const responseData = await api.post<UserData>(AppRouteAPI.LoginPost, requestData);
    saveToken(responseData.data.token);
    dispatch(requireAutorization(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, createAsyncThunkProps>(
  'user/logout',
  async (_, {dispatch, extra: api}) => {
    await api.delete(AppRouteAPI.Logout);
    removeToken();
    dispatch(requireAutorization(AuthStatus.NoAuth));
  },
);

// так ка мы не используем никакие параметры в коллбеке, нам не нужно описывать типы
export const clearErrorActionAPI = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(() => {
      store.dispatch(setError(null));
    }, ERROR_TIMEOUT);
  },
);


