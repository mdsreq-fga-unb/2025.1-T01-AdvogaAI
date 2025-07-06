import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    try {
      await this.client.connect();
    } catch (err) {
      console.error('Falha ao conectar ao RabbitMQ', err);
    }
  }

  public async publish(pattern: string, payload: any): Promise<void> {
    try {
      await lastValueFrom(this.client.emit(pattern, payload));
    } catch (error) {
      console.error(
        `Erro ao publicar mensagem para o padrão ${pattern}:`,
        error,
      );
    }
  }
}
