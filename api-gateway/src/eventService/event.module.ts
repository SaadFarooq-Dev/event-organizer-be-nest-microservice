import { Module } from '@nestjs/common';
import { JwtStrategy } from '../config/passport/JwtStrategy/jwt.strategy';
import { EventController } from './event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventService } from './event.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'event',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'event-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService, JwtStrategy],
})
export class EventModule {}
