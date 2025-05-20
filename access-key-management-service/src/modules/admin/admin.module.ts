import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import AdminAuthGuard from 'src/guards/admin-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from 'src/config/jwt.config';
import { MessageBrokerModule } from '../message-broker/message-broker.module';
import { AdminService } from './admin.service';
import { AccessKeyModule } from '../access-key/access-key.module';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    JwtModule.registerAsync(JWTConfig),
    MessageBrokerModule,
    AccessKeyModule,
    LogsModule
  ],
  controllers: [AdminController],
  providers: [AdminAuthGuard, AdminService],
})
export class AdminModule {}
