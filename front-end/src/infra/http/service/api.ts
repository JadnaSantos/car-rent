import axios from 'axios';
import { AppError } from '../../errors/app-error';
import { UnexpectedError } from '../../errors/unexpected-error';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message));
  } else {
    return Promise.reject(new UnexpectedError());
  }
});
