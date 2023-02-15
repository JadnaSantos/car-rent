interface UserCredentialsDTO {
  username: string
  password: string
  phone: string
}

export type UserAccessDataDTO = {
  username: string
  token: string
};

export { UserCredentialsDTO };
