import React from 'react';
import { toast } from 'react-toastify';
import { createContext, ReactNode, useCallback, useState } from 'react';
import { AuthState, SignInCredentials, SignUpCredentials, User } from '../types/types';
import { api } from '../infra/http/service/api';

export interface AuthContextData {
  username: User;
  signIn(credentials: SignInCredentials): Promise<void>
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
    const username = localStorage.getItem('@CarSales:username');

    if (token && username) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(username) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }: SignInCredentials) => {
    try {
      const response = await api.post('/signin', {
        username, password
      });

      const token = response.data.token;
      const user = response.data.username;

      localStorage.setItem('@CarSales:token', token);
      localStorage.setItem('@CarSales:username', JSON.stringify(user));

      setData({ token, user });

      toast.success('Logado com sucesso');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao acessar, usuario ou senha incorreta');
    }
  }, []);

  // B2345678
  //jadna.silva@yahoo.com

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
      username: data.user,
      signIn,
      signup,
      singOut
    }} >
      {children}
    </AuthContext.Provider>
  );
};



