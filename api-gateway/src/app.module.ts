import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModuleRegisterAsyncConfig } from './config/jwtRegister.config';
import { JwtStrategy } from './config/passport/JwtStrategy/jwt.strategy';
import { EventModule } from './eventService/event.module';
import { UserModule } from './userService/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    UserModule,
    EventModule,
    JwtModuleRegisterAsyncConfig,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
