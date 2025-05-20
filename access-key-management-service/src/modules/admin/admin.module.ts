import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AccessKeyService } from './access-key.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessKey, AccessKeySchema } from 'src/schemas/access-key.schema';
import AdminAuthGuard from 'src/guards/admin-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from 'src/config/jwt.config';
import { MessageBrokerModule } from '../message-broker/message-broker.module';
import { AdminOrchestratedService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AccessKey.name,
        schema: AccessKeySchema,
      },
    ]),
    JwtModule.registerAsync(JWTConfig),
    MessageBrokerModule,
  ],
  controllers: [AdminController],
  providers: [AccessKeyService, AdminAuthGuard, AdminOrchestratedService],
  exports: [AccessKeyService],
})
export class AdminModule {}
