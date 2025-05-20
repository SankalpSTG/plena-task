import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';
import { AccessKeyUpdatesRMQFactory } from 'src/config/rabbitmq.config';
import { ClientsModule } from '@nestjs/microservices';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [ClientsModule.registerAsync([AccessKeyUpdatesRMQFactory]), CacheModule],
  controllers: [AccessControlController],
  providers: [AccessControlService],
  exports: [AccessControlService]
})
export class AccessControlModule {}
