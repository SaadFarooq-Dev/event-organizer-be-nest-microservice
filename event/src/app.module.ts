import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleConfig } from './config/typeOrmModule.config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModuleConfig,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
