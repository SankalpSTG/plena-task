import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import {ConfigModule} from "@nestjs/config"
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfig } from './config/mongoose.config';
import { MessageBrokerModule } from './modules/message-broker/message-broker.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), MongooseModule.forRootAsync(MongooseConfig), AdminModule, UserModule, MessageBrokerModule],
})
export class AppModule {}
