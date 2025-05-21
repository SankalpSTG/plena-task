import { Test, TestingModule } from "@nestjs/testing";
import { RedisModule } from "@nestjs-modules/ioredis";
import { RedisConfig } from "src/config/redis.config";
import { CacheService } from "./cache.service";
import { AccessKeyType } from "../access-control/dto";
import { getTTL } from "../access-control/constants";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('CacheService', () => {
  let module: TestingModule;
  let cacheService: CacheService;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        RedisModule.forRootAsync(RedisConfig),
        RedisModule
      ],
      providers: [CacheService],
    }).compile();

    cacheService = module.get(CacheService);
  });
  describe('CacheService', () => {
    it('Access Key should be saved', async () => {
      const data: AccessKeyType = {
          key: "test-access-key",
          rateLimit: 1,
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          enabled: true
      }
      const expiry = getTTL(data.expiresAt)
      await cacheService.setAccessKey(data.key, JSON.stringify(data), expiry)
      const savedTokenString = await cacheService.getAccessKey(data.key)
      expect(savedTokenString).not.toBe(null)
    });
  });

  describe('RateLimit', () => {
    it('RateLimit should be applied', async () => {
      try{
const data: AccessKeyType = {
          key: "test-access-key",
          rateLimit: 1,
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          enabled: true
      }
      const expiry = getTTL(data.expiresAt)
      await cacheService.setAccessKey(data.key, JSON.stringify(data), expiry)
      await cacheService.addToRateLimitEntries(data.key, Date.now())
      await cacheService.addToRateLimitEntries(data.key, Date.now())
      }catch(error){
        expect(error).toBeInstanceOf(HttpException)
        expect((error as HttpException).getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS)
      }
    });
  });
});

