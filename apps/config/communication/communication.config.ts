import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const getCommunicationConfig = (
  clientName: Array<string>,
): ClientsModuleAsyncOptions => ({
  clients: [
    {
      name: clientName[0],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          port: configService.getOrThrow('ACCOUNT_PORT'),
        },
      }),
    },
    {
      name: clientName[1],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          port: configService.getOrThrow('POSTS_PORT'),
        },
      }),
    },
  ],
});
