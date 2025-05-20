import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
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
  async updateKeyUsage(key: string) {
    const dataString = await this.redis.get(getAccessKeyId(key));
    if (!dataString) throw new UnauthorizedException('Invalid Access Key Provided');
    
    const data: AccessKeyType = JSON.parse(dataString);
    if(!data.enabled) throw new UnauthorizedException("Invalid Access Key Provided")

    const now = Date.now();
    const windowStart = now - WINDOW_SIZE;
    const redisKey = getRateLimitid(key);

    await this.redis.zremrangebyscore(redisKey, 0, windowStart);

    const currentCount = await this.redis.zcard(redisKey);

    if (currentCount >= data.rateLimit) {
      throw new HttpException(
        'Rate limit exceeded',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    await this.redis.zadd(redisKey, now, now.toString());

    await this.redis.expire(redisKey, 61);
  }
}
