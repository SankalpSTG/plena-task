import { Injectable } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from './dto';
import { AccessKey } from 'src/schemas/access-key.schema';
import { MessageBrokerService } from '../message-broker/message-broker.service';
import { RMQEvents } from 'src/transports/rabbitmq/constants';

@Injectable()
export class AdminOrchestratedService {
  constructor(
    private readonly accessKeyService: AccessKeyService,
    private readonly messageBrokerService: MessageBrokerService
  ){}
  async createKey(data: CreateAccessKeyDto): Promise<AccessKey> {
    const key = await this.accessKeyService.createKey(data)
    this.messageBrokerService.emit(RMQEvents.AccessKeyCreated, JSON.stringify({
        key: key.key,
        rateLimit: key.rateLimit,
        expiresAt: key.expiresAt,
        enabled: key.enabled
    }))
    return key
  }

  async getAllKeys(): Promise<AccessKey[]> {
    return this.accessKeyService.getAllKeys()
  }

  async updateKey(id: string, data: UpdateAccessKeyDto): Promise<AccessKey> {
    const key = await this.accessKeyService.updateKey(id, data)
    this.messageBrokerService.emit(RMQEvents.AccessKeyUpdated, JSON.stringify({
        key: key.key,
        rateLimit: key.rateLimit,
        expiresAt: key.expiresAt,
        enabled: key.enabled
    }))
    return key
  }

  async deleteKey(id: string): Promise<void> {
    const key = await this.accessKeyService.deleteKey(id)
    this.messageBrokerService.emit(RMQEvents.AccessKeyDeleted, JSON.stringify({
        key: key.key,
    }))
  }
}
