import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

import { UsersRepository } from 'apps/account/src/users/repositories/users.repository';
import { PostsRepository } from 'apps/posts/src/repositories/posts.repository';

@Module({
  providers: [PrismaService, UsersRepository, PostsRepository],
  exports: [PrismaService, UsersRepository, PostsRepository],
})
export class PrismaModule {}
