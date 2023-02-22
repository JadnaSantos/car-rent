import { IUsersRepository } from '../interfaces/IUserRepository';
import { prisma } from '../prisma/config';
import { User } from '@prisma/client';
import { UserDTO } from '../../../../modules/useCases/user/signUp/dtos';

class UsersRepository implements IUsersRepository {

  async create(data: UserDTO): Promise<User> {
    const { username, password, phone } = data;

    const user = await prisma.user.create({
      data: {
        username,
        password,
        phone,
      },
    });

    return user;
  }


  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    return user;
  }

  async findByPhoneNumber(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        phone
      }
    });

    return user;
  }
}

export { UsersRepository };