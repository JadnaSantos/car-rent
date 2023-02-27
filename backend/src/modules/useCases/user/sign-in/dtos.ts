interface UserCredentialsDTO {
  username: string
  password: string
}

export type UserAccessDataDTO = {
  id: string
  username: string
  token: string
};

export { UserCredentialsDTO };
