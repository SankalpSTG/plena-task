import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

export const MongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>("MONGO_URI");
    return {
      uri,
    };
  },
};
