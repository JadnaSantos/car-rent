import { User } from '@prisma/client';
import { prisma } from '../prisma/config';
import { IUsersRepository } from '../interfaces/IUserRepository';
import { UserDTO } from '../../../../modules/useCases/user/sign-up/dtos';

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

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });

    return user;
  }
}

export { UsersRepository };
