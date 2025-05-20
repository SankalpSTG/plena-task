import { Module } from '@nestjs/common';
import { TokenModule } from './modules/token/token.module';
import { AccessControlModule } from './modules/access-control/access-control.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisConfig } from './config/redis.config';
import { LogsModule } from './modules/logs/logs.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), RedisModule.forRootAsync(RedisConfig), TokenModule, AccessControlModule, LogsModule],
})
export class AppModule {}
