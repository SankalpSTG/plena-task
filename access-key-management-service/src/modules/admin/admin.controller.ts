import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateAccessKeyDto, PaginationType, UpdateAccessKeyDto } from './dto';
import AdminAuthGuard from 'src/guards/admin-auth.guard';
import { AdminService } from './admin.service';
import { LogsService } from '../logs/logs.service';

@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly logsService: LogsService
  ){}

  @Post("key")
  createKey(@Body() data: CreateAccessKeyDto){
    return this.adminService.createKey(data)
  }

  @Delete("key/:key")
  deleteKey(@Param("key") keyId: string){
    if(keyId.length == 0) throw new BadRequestException()
    return this.adminService.deleteKey(keyId)
  }

  @Patch("key/:key")
  updateKey(@Param("key") keyId: string, @Body() data: UpdateAccessKeyDto){
    return this.adminService.updateKey(keyId, data)
  }

  @Get("keys")
  getKeys(@Query() query: PaginationType){
    return this.adminService.getKeys(query)
  }

  @Get("logs")
  getLogs(@Query() query: PaginationType){
    return this.logsService.getLogs(query)
  }
}
