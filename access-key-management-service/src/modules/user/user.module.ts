import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserOrchestratedService } from './user.service';
import { AdminModule } from '../admin/admin.module';
import { MessageBrokerModule } from '../message-broker/message-broker.module';

@Module({
  imports: [AdminModule, MessageBrokerModule],
  controllers: [UserController],
  providers: [UserOrchestratedService]
})
export class UserModule {}
