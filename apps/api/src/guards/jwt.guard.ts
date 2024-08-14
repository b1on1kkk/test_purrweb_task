import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { roles } from '@prisma/client';

import { ExtendedRequest } from 'apps/libs/interfaces';
import { UsersRepository } from 'apps/account/src/users/repositories/users.repository';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // getting roles that accepted for current route
    const roles = this.reflector.getAllAndOverride<Array<roles>>('roles', [
      context.getHandler(),
    ]);

    const req = context.switchToHttp().getRequest<ExtendedRequest>();

    const user = await this.userRepository.findUserBy({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new HttpException('Access forbidden', HttpStatus.FORBIDDEN);
    }

    if (!roles.includes(user.role)) {
      throw new HttpException('Access forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
