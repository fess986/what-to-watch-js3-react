import axios, { AxiosInstance } from 'axios';

const TIMEOUT_API = 5000;

const createAPI = () : AxiosInstance => {
  const api = axios.create({
    baseURL: 'https://8.react.pages.academy/wtw',
    timeout: TIMEOUT_API,
  });

  return api;
};

export default createAPI;
