interface ResetPasswordDTO {
  id: string
  username: string
  token: {
    user_id: string
  },
  password: string,
}

interface UserTokenDTO {
  id: string;
  token: string;
  password: string
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export {
  ResetPasswordDTO,
  UserTokenDTO
};

