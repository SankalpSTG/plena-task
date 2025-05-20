import { Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import AccessKeyGuard from 'src/guards/access-key.guard';
import { AuthorizedAccessKeyRequest } from 'src/types/authorized-request.types';
import { ToggleAccessKeyType } from './dto';

@UseGuards(AccessKeyGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userOrchestratedService: UserService
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