import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProvider, ClientsProviderAsyncOptions } from "@nestjs/microservices";
import { RMQServices, RMQueues } from "src/transports/rabbitmq/constants";
import { RabbitMQConfig } from "src/transports/rabbitmq/rabbitmq.transport";

export const AccessKeyUpdatesRMQFactory: ClientsProviderAsyncOptions = {
  name: RMQServices.AccessKeyUpdatesService,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<ClientProvider> => RabbitMQConfig(configService, RMQueues.AccessKeyUpdatesQueue)
}

export const AccessKeyLogsRMQFactory: ClientsProviderAsyncOptions = {
  name: RMQServices.AccessKeyLogsService,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<ClientProvider> => RabbitMQConfig(configService, RMQueues.AccessKeyLogsQueue)
}