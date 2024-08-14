import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AccountModule } from './account.module';

import { microserviceConnectionConfig } from 'apps/config';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AccountModule);
  const configService = app.get(ConfigService);

  const account_microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AccountModule,
      microserviceConnectionConfig(configService, 'ACCOUNT'),
    );

  await account_microservice.listen();
  Logger.log(`🚀 Account is running`);
}
bootstrap();
