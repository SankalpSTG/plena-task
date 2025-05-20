import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQServices } from 'src/transports/rabbitmq/constants';

@Injectable()
export class MessageBrokerService {
  constructor(
    @Inject(RMQServices.AccessKeyUpdatesService) private readonly accessKeyUpdatesService: ClientProxy
  ){}
  emit(key: string, data: any){
    this.accessKeyUpdatesService.emit(key, data)
  }
}
