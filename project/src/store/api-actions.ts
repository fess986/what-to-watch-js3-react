import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { ThunkActionResult } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {AuthData, UserData} from '../types/user';
import {saveToken, removeToken} from '../services/token';
// import {api} from '../store/index';

import {loadFilms, setIsDataLoaded, requireAutorization} from './action';
import { AppRouteAPI, AuthStatus} from '../const/const';

// вариант без создания createAsyncThunk
export const fetchFilms = () : ThunkActionResult<void> =>
  async (dispatch, _getState , api): Promise<void> => { // возвращаемое значение должно совпадать с дженериком типа ThunkActionResult, в сл
    api.get(AppRouteAPI.Films).then((response) => dispatch(loadFilms(response.data)));
  };

export const fetchFilmsAction = createAsyncThunk<void, undefined, { // void - в данном случае тип возврата из функции, undefined - тип передаваемого аргумента _arg
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'data/fetchFilms',
    async (_arg, {dispatch, extra: api}) => { // в качестве _arg - передаваемые параметры
      const {data} = await api.get(AppRouteAPI.Films);
      dispatch(loadFilms(data));
      dispatch(setIsDataLoaded(true));
    },
  );

export const checkAuthStatusAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
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

export const loginAction = createAsyncThunk<void, AuthData, { // AuthData - тип передаваемых данных, в данном случае {login, password}
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/login',
    async ({login: login1, password}, {dispatch, extra: api}) => {
      const {data: {token}} = await api.post<UserData>(AppRouteAPI.LoginPost, {login1, password});
      saveToken(token);
      dispatch(requireAutorization(AuthStatus.Auth));
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    'user/logout',
    async (_, {dispatch, extra: api}) => {
      await api.delete(AppRouteAPI.Logout);
      removeToken();
      dispatch(requireAutorization(AuthStatus.NoAuth));
    },
  );


