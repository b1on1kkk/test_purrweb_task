import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  UnauthorizedException,
  ServiceUnavailableException,
} from '@nestjs/common';

import { UserEntity } from '../users/entities/users.entity';
import { UsersRepository } from '../users/repositories/users.repository';

import { AccountRegister } from 'apps/libs/contracts/lib/account/account.registration';

import { roles } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register({
    email,
    password,
  }: AccountRegister.Request): Promise<AccountRegister.Response> {
    try {
      const oldUser = await this.usersRepository.findUserBy({
        where: { email },
      });

      if (oldUser) {
        throw new UnauthorizedException('User exist!');
      }

      const newUserEntity = await new UserEntity({
        email: email,
        role: roles.user,
        password: '',
        created_at: new Date(),
        updated_at: new Date(),
      }).setPassword(password);

      const newUser = await this.usersRepository.createUser({
        data: { ...newUserEntity },
      });

      return { email: newUser.email };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findUserBy({ where: { email } });

      if (!user) {
        throw new UnauthorizedException('Login or Password is not correct!');
      }

      const userEntity = new UserEntity({ ...user });
      const isCorrectPassword = await userEntity.validatePassword(password);

      if (!isCorrectPassword) {
        throw new UnauthorizedException('Login or Password is not correct!');
      }

      return { id: user.id, role: user.role };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

      throw new ServiceUnavailableException('Service unavailable right now!');
    }
  }

  async login(id: number, role: roles) {
    return {
      access_token: await this.jwtService.signAsync({ id, role }),
    };
  }
}
