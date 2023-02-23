import React from 'react';
import { toast } from 'react-toastify';
import { createContext, ReactNode, useCallback, useState } from 'react';
import { AuthState, SignInCredentials, SignUpCredentials } from '../types/types';
import { api } from '../infra/http/service/api';


export interface AuthContextData {
  user: object;
  signIn: (credentials: SignInCredentials) => Promise<void>
  signup: (credentials: SignUpCredentials) => Promise<void>
  singOut(): void
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CarSales:token');
    const user = localStorage.getItem('@CarSales:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ password, username }: SignInCredentials) => {
    try {
      const response = await api.post('/signin', {
        username, password
      });
      console.log('response', response);

      const { token, user } = response.data;

      localStorage.setItem('@CarSales:token', token);
      localStorage.setItem('@CarSales:user', JSON.stringify(user));

      setData({ token, user });

      toast.success('Logado com sucess');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao acessar, usuario ou senha incorreta');
    }
  }, []);

  const signup = useCallback(async ({ username, password, phone }: SignUpCredentials) => {
    try {
      const response = await api.post('/users', {
        username, password, phone
      });
      console.log(response);

      const { token, user } = response.data;

      setData({ token, user });

      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      console.log(error);
      toast.error('E-mail já cadastrado no sistema');
    }
  }, []);


  const singOut = useCallback(() => {
    localStorage.removeItem('@CarSales:token');
    localStorage.removeItem('@CarSales:user');

    setData({} as AuthState);
  }, []);


  return (
    <AuthContext.Provider value={{
      user: data.user,
      signIn,
      signup,
      singOut
    }} >
      {children}
    </AuthContext.Provider>
  );
};



