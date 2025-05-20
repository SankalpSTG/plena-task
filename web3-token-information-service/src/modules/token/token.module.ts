import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { HttpModule } from '@nestjs/axios';
import { CoinGeckoService } from './coingecko.service';
import { AccessControlModule } from '../access-control/access-control.module';


@Module({
  imports: [HttpModule, AccessControlModule],
  controllers: [TokenController],
  providers: [TokenService, CoinGeckoService]
})
export class TokenModule {}
