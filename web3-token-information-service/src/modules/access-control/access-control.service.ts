import {
  Injectable,
} from '@nestjs/common';
import Redis from 'ioredis';
import { AccessKeyType, DeleteAccessKeyType } from './dto';
import {
  getAccessKeyId,
  getRateLimitid,
  getTTL,
  WINDOW_SIZE,
} from './constants';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}
  async upsertToken(data: AccessKeyType) {
    await this.redis.set(
      getAccessKeyId(data.key),
      JSON.stringify(data),
      'EX',
      getTTL(data.expiresAt),
    );
  }
  async deleteToken(data: DeleteAccessKeyType) {
    await this.redis.del(getAccessKeyId(data.key));
  }
  async getRateLimit(key: string): Promise<number> {
    const dataString = await this.redis.get(getAccessKeyId(key));
    if (!dataString)  return 0
    
    const data: AccessKeyType = JSON.parse(dataString);
    if(!data.enabled) return 0
    return data.rateLimit
  }
  async updateKeyUsage(key: string, limit: number): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - WINDOW_SIZE;
    const redisKey = getRateLimitid(key);

    await this.redis.zremrangebyscore(redisKey, 0, windowStart);

    const currentCount = await this.redis.zcard(redisKey);

    if (currentCount >= limit) return false

    await this.redis.zadd(redisKey, now, now.toString());

    return true
  }
}
