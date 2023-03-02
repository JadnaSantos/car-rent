interface UserCredentialsDTO {
  username: string
  password: string
}

interface UserAccessDataDTO {
  id: string
  username: string
  token: string
  password?: string
}

interface UserAccessForgotPassword {
  username: string
}

export { UserCredentialsDTO, UserAccessDataDTO, UserAccessForgotPassword };
