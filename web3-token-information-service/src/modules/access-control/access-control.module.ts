import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AccessKeyUpdatesRMQFactory } from 'src/config/rabbitmq.config';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [RedisModule, ClientsModule.registerAsync([AccessKeyUpdatesRMQFactory])],
  controllers: [AccessControlController],
  providers: [AccessControlService],
  exports: [AccessControlService]
})
export class AccessControlModule {}
