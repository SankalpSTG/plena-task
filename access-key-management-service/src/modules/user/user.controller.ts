import { Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserOrchestratedService } from './user.service';
import AccessKeyGuard from 'src/guards/access-key.guard';
import { AuthorizedAccessKeyRequest } from 'src/types/authorized-request.types';
import { ToggleAccessKeyType } from './dto';

@UseGuards(AccessKeyGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userOrchestratedService: UserOrchestratedService
  ){}
  @Get("/key")
  async getAccessKeyDetails(@Req() req: AuthorizedAccessKeyRequest){
    return await this.userOrchestratedService.getAccessKeyDetails(req.accessKey)
  }
  @Patch("/key")
  async updateAccessKeyStatus(@Req() req: AuthorizedAccessKeyRequest<ToggleAccessKeyType>){
    return this.userOrchestratedService.updateAccessKeyStatus(req.accessKey, req.body.enabled)
  }
}