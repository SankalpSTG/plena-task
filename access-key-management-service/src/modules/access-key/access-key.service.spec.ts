import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeyService } from './access-key.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { CreateAccessKeyDto } from './dto';
import { AccessKey, AccessKeySchema } from 'src/schemas/access-key.schema';
import { MongooseConfig } from 'src/config/mongoose.config';
import { ConfigModule } from '@nestjs/config';
import { PaginationType } from '../admin/dto';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'mongoose';

describe('AccessKeyService', () => {
  let module: TestingModule;
  let accessKeyService: AccessKeyService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync(MongooseConfig),
        MongooseModule.forFeature([
          {
            name: AccessKey.name,
            schema: AccessKeySchema,
          },
        ]),
      ],
      providers: [AccessKeyService],
    }).compile();

    accessKeyService = module.get(AccessKeyService);
  });
  afterAll(async () => {
    const connection = module.get<Connection>(getConnectionToken())
    await connection.close()
    await module.close();
  });

  describe('insert access key', () => {
    it('should insert an access key', async () => {
      const data: CreateAccessKeyDto = {
        expiresInSeconds: 3600,
        rateLimit: 1,
      };
      const createResponse = await accessKeyService.createKey(data);
      const findResponse = await accessKeyService.getAccessKeyDetails(
        createResponse.key,
      );
      expect(findResponse.key).toBeDefined();
      expect(findResponse.key).toBe(createResponse.key);
      expect(findResponse.rateLimit).toBe(data.rateLimit);
    });
  });
  describe('delete access key', () => {
    it('should insert an access key', async () => {
      try {
        const data: PaginationType = {
          limit: 1,
          page: 0,
        };
        const keys = await accessKeyService.getKeys(data);
        await accessKeyService.deleteKey(keys[0]._id.toString());
        await accessKeyService.getAccessKeyDetails(keys[0].key);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('update access key', () => {
    it('should update an access key', async () => {
      const data: CreateAccessKeyDto = {
        expiresInSeconds: 3600,
        rateLimit: 1,
      };
      const key = await accessKeyService.createKey(data);
      await accessKeyService.updateKey(key._id.toString(), {
        rateLimit: 100,
      });
      const response = await accessKeyService.getAccessKeyDetails(key.key);
      expect(response.rateLimit).toBe(100);
    });
    it('should update status of access key', async () => {
      const data: CreateAccessKeyDto = {
        expiresInSeconds: 3600,
        rateLimit: 1,
      };
      const key = await accessKeyService.createKey(data);
      await accessKeyService.updateAccessKeyStatus(key.key, false);
      const response = await accessKeyService.getAccessKeyDetails(key.key);
      expect(response.enabled).toBe(false);
    });
  });
});
