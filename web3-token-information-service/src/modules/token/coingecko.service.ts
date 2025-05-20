import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { COIN_GECKO_API_ENDPOINTS } from './constants/coin-gecko';

@Injectable()
export class CoinGeckoService {
  constructor(
    private readonly httpService: HttpService
  ){}
  async getCoinDetails(coin: string){
    const response = await firstValueFrom(this.httpService.get(COIN_GECKO_API_ENDPOINTS.getCoinDetails(coin)))
    return response.data
  }
}
