import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

type MicroserviceType = 'ACCOUNT' | 'POSTS';

export const microserviceConnectionConfig = (
  configService: ConfigService,
  type: MicroserviceType,
): MicroserviceOptions => {
  switch (type) {
    case 'ACCOUNT':
      return {
        transport: Transport.TCP,
        options: {
          port: configService.getOrThrow(`${type}_PORT`),
        },
      };
    case 'POSTS':
      return {
        transport: Transport.TCP,
        options: {
          port: configService.getOrThrow(`${type}_PORT`),
        },
      };
  }
};
