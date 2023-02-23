export interface AuthState {
  token: string;
  user: object;
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
