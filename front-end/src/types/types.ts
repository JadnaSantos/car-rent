export interface User {
  id: string;
  username: string;
}
export interface AuthState {
  user: User;
  token: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  phone: string;
}
