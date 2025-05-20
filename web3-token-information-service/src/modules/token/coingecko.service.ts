import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CoinGeckoService {
  constructor(
    private readonly httpService: HttpService
  ){}
  async getCoinDetails(coin: string){
    const response = await firstValueFrom(this.httpService.get(`https://api.coingecko.com/api/v3/coins/${coin}`))
    return response.data
  }
}
