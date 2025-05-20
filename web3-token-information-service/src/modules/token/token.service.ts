import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CoinGeckoService } from './coingecko.service';
import { COINS } from '../constants/coins';

@Injectable()
export class TokenService {
  constructor(
    private readonly coingeckoService: CoinGeckoService
  ){}
  async getTokenDetails(token: string){
    if(!COINS.includes(token)) throw new NotFoundException(`Coin ${token} Not Found`)
    return await this.coingeckoService.getCoinDetails(token)
  }
}
