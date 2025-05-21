import { Test, TestingModule } from "@nestjs/testing";
import { CoinGeckoService } from "./coingecko.service";
import { ConfigModule } from "@nestjs/config";
import { TokenController } from "./token.controller";
import { TokenService } from "./token.service";
import { LogsModule } from "../logs/logs.module";
import { HttpModule } from "@nestjs/axios";
import { AccessControlModule } from "../access-control/access-control.module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { RedisConfig } from "src/config/redis.config";
import { CacheModule } from "../cache/cache.module";

describe('CoinGeckoService', () => {
  let module: TestingModule;
  let coinGeckoService: CoinGeckoService;
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

    coinGeckoService = module.get(CoinGeckoService);
  });
  describe('CoinGeckoService', () => {
    it('Coin Details should be fetched', async () => {
      const response = await coinGeckoService.getCoinDetails("bitcoin")
      expect(response).toBeDefined()
    });
  });
});

