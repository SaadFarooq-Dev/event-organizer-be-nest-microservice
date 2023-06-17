import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const JwtModuleRegisterAsyncConfig = JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get<string>('JWT_SECRET'),
      global: true,
      signOptions: { expiresIn: '60000s' },
    };
  },
  inject: [ConfigService],
});
