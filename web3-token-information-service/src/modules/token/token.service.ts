import { Injectable, NotFoundException } from '@nestjs/common';
import { CoinGeckoService } from './coingecko.service';
import { COINS } from './constants/coins';
import { CacheService } from '../cache/cache.service';
import { CACHE_EXPIRY_MINUTE } from '../cache/constants';

@Injectable()
export class TokenService {
  constructor(
    private readonly coingeckoService: CoinGeckoService,
    private readonly cacheService: CacheService
  ){}
  
  async getTokenDetails(token: string){
    if(!COINS.includes(token)) throw new NotFoundException(`Coin ${token} Not Found`);
    const data = await this.cacheService.getCoinData(token)
    if(data) return JSON.parse(data)
    const response = await this.coingeckoService.getCoinDetails(token)
    await this.cacheService.setCoinDataWithExpiry(token, JSON.stringify(response), CACHE_EXPIRY_MINUTE)
    return response
  }
}
