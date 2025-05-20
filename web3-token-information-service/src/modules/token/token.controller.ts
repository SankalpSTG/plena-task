import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import AccessKeyGuard from 'src/guards/access-key.guard';

@UseGuards(AccessKeyGuard)
@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService
  ){}

  @Get(":id")
  getTokenInfo(@Param("id") id: string){
    return this.tokenService.getTokenDetails(id)
  }
}
