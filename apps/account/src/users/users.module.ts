import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { ServiceUnavailableFilter } from '../filters/service_unavailable.filters';
import { ResponseTransformInterceptor } from './interceptors/responseTransform.interceptor';

import { PrismaModule } from 'apps/prisma/assets/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    ResponseTransformInterceptor,
    ServiceUnavailableFilter,
    UsersService,
  ],
})
export class UsersModule {}
