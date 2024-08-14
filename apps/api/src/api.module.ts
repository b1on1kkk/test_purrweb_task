import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from '@nestjs/microservices';

import { PrismaModule } from 'apps/prisma/assets/prisma.module';

import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';
import { PostsController } from './controller/posts.controller';

import {
  getEnvConfig,
  getJWTConfig,
  getCommunicationConfig,
} from 'apps/config';

import { JWTAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule.forRoot(getEnvConfig()),
    JwtModule.registerAsync(getJWTConfig()),
    ClientsModule.registerAsync(getCommunicationConfig(['ACCOUNT', 'POSTS'])),
  ],
  controllers: [AuthController, UserController, PostsController],
  providers: [JwtStrategy, JWTAuthGuard],
  exports: [PassportModule],
})
export class ApiModule {}
