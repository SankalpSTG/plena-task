import { Injectable } from '@nestjs/common';
import { AccessKeyService } from '../admin/access-key.service';
import { MessageBrokerService } from '../message-broker/message-broker.service';
import { RMQEvents } from 'src/transports/rabbitmq/constants';

@Injectable()
export class UserOrchestratedService {
  constructor(
    private readonly accessKeyService: AccessKeyService,
        private readonly messageBrokerService: MessageBrokerService
  ){}
  async getAccessKeyDetails(accessKey: string){
    return await this.accessKeyService.getAccessKeyDetails(accessKey)
  }
  async updateAccessKeyStatus(accessKey: string, enabled: boolean){
    const key =  await this.accessKeyService.updateAccessKeyStatus(accessKey, enabled)
      this.messageBrokerService.emit(RMQEvents.AccessKeyStatusUpdated, JSON.stringify({
          key: key.key,
          expiresAt: key.expiresAt,
          rateLimit: key.rateLimit,
          enabled: enabled
      }))
    return key
  }
}