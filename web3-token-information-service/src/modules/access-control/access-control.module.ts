import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { AccessControlController } from './access-control.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [RedisModule],
  controllers: [AccessControlController],
  providers: [AccessControlService],
  exports: [AccessControlService]
})
export class AccessControlModule {}
