import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from './dto';
import AdminAuthGuard from 'src/guards/admin-auth.guard';
import { AdminOrchestratedService } from './admin.service';

@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminOrchestratedService: AdminOrchestratedService
  ){}

  @Post("key")
  createKey(@Body() data: CreateAccessKeyDto){
    return this.adminOrchestratedService.createKey(data)
  }

  @Delete("key/:key")
  deleteKey(@Param("key") keyId: string){
    if(keyId.length == 0) throw new BadRequestException()
    return this.adminOrchestratedService.deleteKey(keyId)
  }

  @Patch("key/:key")
  updateKey(@Param("key") keyId: string, @Body() data: UpdateAccessKeyDto){
    return this.adminOrchestratedService.updateKey(keyId, data)
  }

  @Get("keys")
  getKeys(){
    return this.adminOrchestratedService.getAllKeys()
  }
}
