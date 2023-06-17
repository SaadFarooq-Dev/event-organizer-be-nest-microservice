import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleConfig } from './config/typeOrmModule.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModuleConfig,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
