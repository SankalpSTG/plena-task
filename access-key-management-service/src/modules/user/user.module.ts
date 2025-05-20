import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminModule } from '../admin/admin.module';
import { MessageBrokerModule } from '../message-broker/message-broker.module';
import { AccessKeyModule } from '../access-key/access-key.module';

@Module({
  imports: [AdminModule, MessageBrokerModule, AccessKeyModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
