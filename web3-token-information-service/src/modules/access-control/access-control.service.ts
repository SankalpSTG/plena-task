import {
  Injectable,
} from '@nestjs/common';
import Redis from 'ioredis';
import { AccessKeyType, DeleteAccessKeyType } from './dto';
import {
  getTTL,
  WINDOW_SIZE,
} from './constants';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { CacheService } from '../cache/cache.service';
import { getAccessKeyId } from '../cache/constants';

@Injectable()
export class AccessControlService {
  constructor(
    private readonly cacheService: CacheService
  ) {}
  async upsertToken(data: AccessKeyType) {
    await this.cacheService.setAccessKey(data.key, JSON.stringify(data), getTTL(data.expiresAt))
  }
  async deleteToken(data: DeleteAccessKeyType) {
    await this.cacheService.deleteAccessKey(getAccessKeyId(data.key))
  }
  async getRateLimit(key: string): Promise<number> {
    const dataString = await this.cacheService.getAccessKey(key);
    if (!dataString)  return 0
    
    const data: AccessKeyType = JSON.parse(dataString);
    if(!data.enabled) return 0
    return data.rateLimit
  }
  async updateKeyUsage(key: string, limit: number): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - WINDOW_SIZE;

    const currentCount = await this.cacheService.countRateLimitEntries(key, windowStart);
    if (currentCount >= limit) return false

    await this.cacheService.addToRateLimitEntries(key, now);
    
    return true
  }
}
