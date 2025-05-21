import { Test, TestingModule } from "@nestjs/testing";
import { CoinGeckoService } from "./coingecko.service";
import { ConfigModule } from "@nestjs/config";
import { TokenController } from "./token.controller";
import { LogsModule } from "../logs/logs.module";
import { HttpModule } from "@nestjs/axios";
import { AccessControlModule } from "../access-control/access-control.module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { RedisConfig } from "src/config/redis.config";
import { CacheModule } from "../cache/cache.module";
import { TokenService } from "./token.service";

describe('TokenService', () => {
  let module: TestingModule;
  let tokenService: TokenService;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        RedisModule.forRootAsync(RedisConfig),
        HttpModule,
        AccessControlModule,
        LogsModule,
        CacheModule
      ],
      controllers: [TokenController],
      providers: [TokenService, CoinGeckoService],
    }).compile();

    tokenService = module.get(TokenService);
  });
  describe('TokenService', () => {
    it('Coin Details should be fetched', async () => {
      const response = await tokenService.getTokenDetails("bitcoin")
      expect(response).toBeDefined()
    });
  });
});

