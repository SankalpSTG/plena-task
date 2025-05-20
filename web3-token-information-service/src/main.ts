import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMQConfig } from './transports/rabbitmq/rabbitmq.transport';
import { ConfigService } from '@nestjs/config';
import { RMQueues } from './transports/rabbitmq/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(RabbitMQConfig(app.get(ConfigService), RMQueues.AccessKeyUpdatesQueue))
  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
