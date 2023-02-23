import axios, { AxiosResponse } from 'axios';
import { SignInCredentials, SignUpCredentials } from '../../../types/types';
import { api } from './api';

export const CarService = {
  signing: async function () {
    try {
      const response = await api.post('/signin', {
        password, username
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },

  signup: async function ({ username, password, phone }: SignUpCredentials) {
    try {
      const data = await api.post('/users', {
        username, password, phone
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },

  createCar: async function () {
    try {
      const data = await api.post('/cars');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },

  listCar: async function () {
    try {
      const data = await api.post('/list-cars');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },

  detailsCar: async function () {
    try {
      const data = await api.get('/cars');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },

  deleteCar: async function () {
    try {
      const data = await api.delete('/cars');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },

  updateCar: async function () {
    try {
      const data = await api.delete('/update-car');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },


  finishCar: async function () {
    try {
      const data = await api.delete('/car-finish');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Status: ${error.response.status} - ${error.message}`);
      }
    }
  },
};
