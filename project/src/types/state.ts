import {store} from '../store/index';
import { ThunkAction, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

// тут мы прописываем тип State вручную. Точнее начинаем, далее на автомате
// export type State = {
//   genre: string,
//   filmList: string[],
// }

// этот тип мы создаем и используем сразу в api-actions.ts
// type createAsyncThunkProps = {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }

// тут тип State берется непосредственно из хранилища. ReturnType получает тип возвращаемой функцией store.getState объекта. Без этого получился бы корявый тип
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>

export type ThunkDispatchApp = ThunkDispatch<State, AxiosInstance, Action>

