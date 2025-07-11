import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';

interface RabbitMQModuleOptions {
  name: string;
  queue: string;
}

@Module({})
export class RabbitMQModule {
  static register({ name, queue }: RabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.register([
          {
            name: name,
            transport: Transport.RMQ,
            options: {
              urls: [
                process.env.RABBITMQ_URL ?? 'amqp://admin:admin@localhost:5672',
              ],
              queue: queue,
              queueOptions: {
                durable: true,
              },
            },
          },
        ]),
      ],
      providers: [RabbitMQService],
      exports: [RabbitMQService],
    };
  }
}
