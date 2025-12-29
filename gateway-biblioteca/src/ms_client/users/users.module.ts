import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envVars } from 'src/config/envs.validator';

@Module({
  controllers: [UsersController],
  imports: [
    ClientsModule.register([
      {
        name: 'NATS-CLIENT',
        transport: Transport.NATS,
        options: {
          servers: [envVars.NATS_SERVER]
        }
      }
    ])
  ]
})
export class UsersModule { }
