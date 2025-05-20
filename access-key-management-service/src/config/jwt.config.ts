import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JWTConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const accessTokenExpiry = configService.get<string>("ACCESS_TOKEN_EXPIRY");
    return {
    signOptions: {
      expiresIn: accessTokenExpiry || '1h',
    },
  }
  },
};