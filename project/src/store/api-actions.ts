import { AxiosInstance } from 'axios';

import {saveToken, removeToken} from '../services/token';
// import {loadFilms, loadActiveFilm} from './reduser/films/films-reducer'; // мы не можем использовать экшены из films-reducer, так как туда мы отсылаем часть данных и получаем лексическую ошибку декларации
import {setAutorizationStatus} from './reduser/user/user-reducer';
import {redirectToRoute} from './action';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import {AuthData, UserData} from '../types/user';
import { Review } from '../types/films';
import { AppRouteAPI, AuthStatus, ERROR_TIMEOUT, AppRoute, ActionTypesAPI} from '../const/const';

// вариант без создания createAsyncThunk
// export const fetchFilms = () : ThunkActionResult<void> =>
//   async (dispatch, _getState , api): Promise<void> => { // возвращаемое значение должно совпадать с дженериком типа ThunkActionResult, в сл
//     api.get(AppRouteAPI.Films).then((response) => dispatch(loadFilms(response.data)));
//   };

type createAsyncThunkProps = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchFilmsAction = createAsyncThunk<unknown[], undefined, { // void - в данном случае тип возврата из функции, undefined - тип передаваемого аргумента _arg
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    ActionTypesAPI.FETCH_FILMS,
    async (_arg, {dispatch, extra: api}) => { // в качестве _arg - передаваемые параметры
      const {data} = await api.get(AppRouteAPI.Films);
      // dispatch(setIsFilmsLoaded(true));  // перенесено в appSlice
      // dispatch(loadFilms(adaptAllFilmAPItoProject(data))); // перенесено в filmsSlice
      return data;
    },
  );

export const fetchReviews = createAsyncThunk<Review[], number, { // void - в данном случае тип возврата из функции, undefined - тип передаваемого аргумента _arg
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance
  }>(
    ActionTypesAPI.FETCH_REVIEWS,
    async (id, {dispatch, extra: api}) => {
      // dispatch(changeReviewsLoadedStatus(false));
      const {data} = await api.get(`${AppRouteAPI.Comments}${id}`);
      // dispatch(loadReviews(data));
      // dispatch(changeReviewsLoadedStatus(true));
      return data;
    },
  );

export const fetchActiveFilmAction = createAsyncThunk<unknown, number, createAsyncThunkProps>(
  ActionTypesAPI.FETCH_ACTIVE_FILM,
  async (id, {dispatch, extra: api}) => { // в качестве _arg - передаваемые параметры
    const {data} = await api.get(`${AppRouteAPI.Film}${id}`);
    // dispatch(loadActiveFilm(adaptFilmAPItoProject(data))); // перенесено в filmsSlice
    // dispatch(setIsActiveFilmLoaded(true)); // перенесено в appSlice
    return data;
  },
);

export const checkAuthStatusAction = createAsyncThunk<void, undefined, createAsyncThunkProps>(
  ActionTypesAPI.CHECK_AUTH_STATUS,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(AppRouteAPI.LoginCheck);
      dispatch(setAutorizationStatus(AuthStatus.Auth));

    } catch {
      dispatch(setAutorizationStatus(AuthStatus.NoAuth));
    }
  },
);

// export const loginAction = createAsyncThunk<void, AuthData, createAsyncThunkProps // AuthData - тип передаваемых данных, в данном случае {login, password}
//   >(
//     'user/login',
//     async ({email, password}, {dispatch, extra: api}) => {
//       const {data: {token}} = await api.post<UserData>(AppRouteAPI.LoginPost, {email, password});
//       saveToken(token);
//       dispatch(setAutorizationStatus(AuthStatus.Auth));
//     },
//   );

export const loginAction = createAsyncThunk<void, AuthData, createAsyncThunkProps // AuthData - тип передаваемых данных, в данном случае {login, password}
>(
  ActionTypesAPI.LOGIN,
  async (requestData, {dispatch, extra: api}) => {
    const responseData = await api.post<UserData>(AppRouteAPI.LoginPost, requestData);
    saveToken(responseData.data.token);
    dispatch(setAutorizationStatus(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, createAsyncThunkProps>(
  ActionTypesAPI.LOGOUT,
  async (_, {dispatch, extra: api}) => {
    await api.delete(AppRouteAPI.Logout);
    removeToken();
    dispatch(setAutorizationStatus(AuthStatus.NoAuth));
  },
);

export const clearErrorActionAPI = createAsyncThunk<void, undefined, createAsyncThunkProps>(
  ActionTypesAPI.CLEAR_ERROR,
  async (_, {dispatch, extra: api}) => {
    setTimeout(() => {
      // dispatch(setError(null)); // нельзя диспатчить, из за лексической ошибки, перенесено в app-reducer
    }, ERROR_TIMEOUT);
  },
);

// так ка мы не используем никакие параметры в коллбеке, нам не нужно описывать типы. Но если мы используем тут сам store, то получаем ошибку доступа к переменным в других модулях
// export const clearErrorActionAPI = createAsyncThunk(
//   'app/clearError',
//   async () => {
//     setTimeout(() => {
//       store.dispatch(setError(null));
//     }, ERROR_TIMEOUT);
//   },
// );

