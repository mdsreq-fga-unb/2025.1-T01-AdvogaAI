import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '../dto/send-email.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class EmailQueueService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async publishEmail(data: SendEmailDto) {
    try {
      await this.rabbitMQService.publish('send_email', data);
      return { success: true, message: 'E-mail enviado com sucesso!' };
    } catch (error) {
      console.error('Erro ao publicar o e-mail na fila:', error);
      throw new Error('Falha ao publicar o e-mail na fila.');
    }
  }
}
