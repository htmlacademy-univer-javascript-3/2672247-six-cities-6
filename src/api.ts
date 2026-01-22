import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import { dropToken, getToken } from './services/token';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (onUnauthorized: () => void): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers = AxiosHeaders.from({
        ...config.headers,
        'X-Token': token,
      });
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        dropToken();
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );

  return api;
};
