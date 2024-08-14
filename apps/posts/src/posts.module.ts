import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'apps/prisma/assets/prisma.module';

import { getEnvConfig } from 'apps/config';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [ConfigModule.forRoot(getEnvConfig()), PrismaModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
