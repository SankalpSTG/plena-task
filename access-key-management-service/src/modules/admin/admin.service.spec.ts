import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { ConfigModule } from '@nestjs/config';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { MongooseConfig } from 'src/config/mongoose.config';
import { MessageBrokerModule } from '../message-broker/message-broker.module';
import { AccessKeyModule } from '../access-key/access-key.module';
import { LogsModule } from '../logs/logs.module';
import { AdminController } from './admin.controller';
import AdminAuthGuard from 'src/guards/admin-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from 'src/config/jwt.config';
import { Connection } from 'mongoose';

describe('AdminService', () => {
  let module: TestingModule;
  let adminService: AdminService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync(JWTConfig),
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync(MongooseConfig),
        MessageBrokerModule,
        AccessKeyModule,
        LogsModule,
      ],
      controllers: [AdminController],
      providers: [AdminAuthGuard, AdminService],
    }).compile();

    adminService = module.get(AdminService);
  });
  afterAll(async () => {
    const connection = module.get<Connection>(getConnectionToken());
    await connection.close();
    await module.close();
  });
  describe('AdminService', () => {
    it('should be defined', async () => {
      expect(adminService).toBeDefined()
    });
  });
});
