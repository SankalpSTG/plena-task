import { Module } from '@nestjs/common';
import { TokenModule } from './modules/token/token.module';
import { AccessControlModule } from './modules/access-control/access-control.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisConfig } from './config/redis.config';
import { ClientsModule } from '@nestjs/microservices';
import { AccessKeyUpdatesRMQFactory } from './config/rabbitmq.config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), RedisModule.forRootAsync(RedisConfig), ClientsModule.registerAsync([AccessKeyUpdatesRMQFactory]), TokenModule, AccessControlModule],
})
export class AppModule {}
