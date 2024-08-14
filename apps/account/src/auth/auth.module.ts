import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { getJWTConfig } from 'apps/config';
import { PrismaService } from 'apps/prisma';

import { UsersRepository } from '../users/repositories/users.repository';

@Module({
  imports: [JwtModule.registerAsync(getJWTConfig())],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, PrismaService],
})
export class AuthModule {}
