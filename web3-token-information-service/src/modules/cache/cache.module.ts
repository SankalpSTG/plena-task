import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [RedisModule],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule {}
