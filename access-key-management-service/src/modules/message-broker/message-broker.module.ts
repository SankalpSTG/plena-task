import { Module } from '@nestjs/common';
import { MessageBrokerService } from './message-broker.service';
import { ClientsModule } from '@nestjs/microservices';
import { AccessKeyUpdatesRMQFactory } from 'src/config/rabbitmq.config';

@Module({
  imports: [ClientsModule.registerAsync([AccessKeyUpdatesRMQFactory])],
  providers: [MessageBrokerService],
  exports: [MessageBrokerService]
})
export class MessageBrokerModule {}
