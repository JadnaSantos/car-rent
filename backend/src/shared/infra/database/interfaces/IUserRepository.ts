import { User } from '@prisma/client';
import { UserDTO } from '../../../../modules/useCases/user/signUp/dtos';

interface IUsersRepository {
  create: (data: UserDTO) => Promise<User>
  findByUsername: (username: string) => Promise<User | null>
  findByPhoneNumber: (phone: string) => Promise<User | null>
}

export { IUsersRepository };
