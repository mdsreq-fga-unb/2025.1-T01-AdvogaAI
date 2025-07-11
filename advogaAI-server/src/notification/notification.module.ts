import { Module } from '@nestjs/common';
import { NotificacaoService } from './notification.service';
import { NotificacaoController } from './notification.controller';
import { EmailModule } from 'src/email/email.module';
import { ProcessosModule } from 'src/process/process.module';

@Module({
  imports: [EmailModule, ProcessosModule],
  providers: [NotificacaoService],
  controllers: [NotificacaoController],
})
export class NotificationModule {
  constructor(private readonly notificacaoService: NotificacaoService) {
    this.notificacaoService.scheduleCronJobs();
  }
}
