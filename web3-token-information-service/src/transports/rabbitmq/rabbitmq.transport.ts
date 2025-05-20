import { RmqOptions, Transport } from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config"
export const RABBITMQ1_SERVICE = 'RABBITMQ1_SERVICE';

export const RabbitMQConfig= (configService: ConfigService, queue: string):RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.get<string>("RABBITMQ_URL")!!],
    queue: queue,
    queueOptions: {
      durable: true
    },
  },
})