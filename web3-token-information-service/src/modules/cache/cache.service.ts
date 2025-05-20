import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { getAccessKeyId, getCoinId, getRateLimitid } from './constants';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ){}
  async setAccessKey(key: string, value: string, expiry: number){
    await this.redis.set(getAccessKeyId(key), value, "EX", expiry)
  }

  async deleteAccessKey(key: string){
    await this.redis.del(getAccessKeyId(key))
  }

  async getAccessKey(key: string){
    return await this.redis.get(getAccessKeyId(key))
  }

  async removeRateLimitEntriesOutOfWindow(key: string, windowStart: number){
    await this.redis.zremrangebyscore(getRateLimitid(key), 0, windowStart)
  }

  async countRateLimitEntries(key: string, windowStart: number){
    await this.redis.zremrangebyscore(getRateLimitid(key), 0, windowStart)
    return await this.redis.zcard(getRateLimitid(key))
  }

  async addToRateLimitEntries(key: string, time: number){
    await this.redis.zadd(getRateLimitid(key), time, time.toString());
  }

  async setCoinDataWithExpiry(key: string, value: string, expiry: number){
    await this.redis.set(getCoinId(key), value, "EX", expiry)
  }

  async getCoinData(key: string){
    return await this.redis.get(getCoinId(key))
  }
}
