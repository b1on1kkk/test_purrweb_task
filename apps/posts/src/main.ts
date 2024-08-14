import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';

import { PostsModule } from './posts.module';

import { microserviceConnectionConfig } from 'apps/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(PostsModule);
  const configService = app.get(ConfigService);

  const posts_microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      PostsModule,
      microserviceConnectionConfig(configService, 'POSTS'),
    );

  await posts_microservice.listen();
  Logger.log(`🚀 Posts is running`);
}
bootstrap();
