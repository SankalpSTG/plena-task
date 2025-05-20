import { RedisModuleAsyncOptions } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const RedisConfig: RedisModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const redisUri = configService.get<string>('REDIS_URI');
    return {
      type: "single",
      url: redisUri,
    }
  },
};
