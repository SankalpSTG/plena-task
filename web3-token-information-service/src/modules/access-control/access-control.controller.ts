import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RMQEvents } from 'src/transports/rabbitmq/constants';
import { AccessControlService } from './access-control.service';

@Controller()
export class AccessControlController {
  constructor(
    private readonly accessControlService: AccessControlService
  ){}
  @EventPattern(RMQEvents.AccessKeyCreated)
  async createAccessKey(@Payload() data: string){
    this.accessControlService.upsertToken(JSON.parse(data))
  }
  @EventPattern(RMQEvents.AccessKeyUpdated)
  async updateAccessKey(@Payload() data: string){
    this.accessControlService.upsertToken(JSON.parse(data))
  }
  @EventPattern(RMQEvents.AccessKeyDeleted)
  async deleteAccessKey(@Payload() data: string){
    this.accessControlService.deleteToken(JSON.parse(data))
  }
  @EventPattern(RMQEvents.AccessKeyStatusUpdated)
  async updateTokenStatus(@Payload() data: string){
    this.accessControlService.upsertToken(JSON.parse(data))
  }
}
