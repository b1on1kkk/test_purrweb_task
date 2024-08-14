import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

import { User } from '@prisma/client';

import { UserEntity } from './entities/users.entity';

import { UsersRepository } from './repositories/users.repository';

import {
  UsersDelete,
  UsersUpdate,
  UsersGetAll,
  UsersGetById,
} from 'apps/libs/contracts';

import { buildFilteringQuery } from './utils/buildFilteringQuery.util';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getAllUsers(data: UsersGetAll.Request): Promise<Array<User>> {
    try {
      const filtering = buildFilteringQuery(data);

      return await this.userRepository.getUsers({ ...filtering });
    } catch (error) {
      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async getUserById(data: UsersGetById.Request): Promise<User> {
    try {
      const user = await this.userRepository.findUserBy({
        where: { id: data.id },
      });

      if (!user) throw new NotFoundException('User not found!');

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async updateUserById(data: UsersUpdate.Request): Promise<User> {
    try {
      const user = await this.userRepository.findUserBy({
        where: { id: data.id },
      });

      if (!user) throw new NotFoundException('User not found!');

      const newUserEntity = new UserEntity({
        ...user,
        email: data.email,
      });

      if (data.password) await newUserEntity.setPassword(data.password);

      return this.userRepository.updateUser({
        where: { id: data.id },
        data: newUserEntity,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async deleteUserById(data: UsersDelete.Request): Promise<Array<User>> {
    try {
      const user = await this.userRepository.findUserBy({
        where: { id: data.id },
      });

      if (!user) throw new NotFoundException('User not found!');

      await this.userRepository.deleteUser({
        where: { id: data.id },
      });

      return await this.userRepository.getUsers({});
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }
}
