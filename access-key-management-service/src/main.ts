import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RabbitMQConfig } from './transports/rabbitmq/rabbitmq.transport';
import { ConfigService } from '@nestjs/config';
import { RMQueues } from './transports/rabbitmq/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  app.connectMicroservice(RabbitMQConfig(app.get(ConfigService), RMQueues.AccessKeyLogsQueue))
  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
