import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { getEnvConfig } from 'apps/config';

@Module({
  imports: [ConfigModule.forRoot(getEnvConfig()), UsersModule, AuthModule],
})
export class AccountModule {}
