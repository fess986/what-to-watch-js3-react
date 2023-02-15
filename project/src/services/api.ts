import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {StatusCodes} from 'http-status-codes'; // библиотека с набором кодов статусов ответов от серверов
import {toast} from 'react-toastify';

import { getToken } from './token';
// import {errorHandler} from '../services/error-handler';
import { TIMEOUT_API } from '../const/const';

// будем отображать ошибки только с выбранными статусами
const StatusCodesMap: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

// проверяем нужно ли отображать ошибку
const shouldDisplayError = (response: AxiosResponse) => !!StatusCodesMap[response.status];

// создаем и настраиваем инстанс axios, через функцию
const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://8.react.pages.academy/wtw',
    timeout: TIMEOUT_API,
  });

  api.interceptors.response.use((response) => response, // ответ пробрасываем дальше без изменений
    (error: AxiosError) => { // если есть ошибка, проверяем нужно ли её отобразить, и в любом случае пробрасываем её
      if (error.response && shouldDisplayError(error.response)) {
        // errorHandler(error.response.data.error);
        toast.warn(error.response.data.error, {autoClose : 2000, draggable : true});
      }

      throw(error);
    });

  // перехватчик ответа добавляет в хедер информацию токена, если тот существует
  api.interceptors.request.use((config : AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};

export default createAPI;
