import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';
// import { config } from 'process';

const TIMEOUT_API = 5000;

const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://8.react.pages.academy/wtw',
    timeout: TIMEOUT_API,
  });

  api.interceptors.request.use((config : AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    console.log(token);
    console.log(config);
    return config;
  });

  return api;
};

export default createAPI;
